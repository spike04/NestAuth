import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LoginDTO } from './dto/LoginDTO'
import { RegisterDTO } from './dto/RegisterDTO'
import { LoginRsp, SignupRsp, User } from './interface/user.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(doc: RegisterDTO): Promise<SignupRsp> {
    // if user has already created with this email
    const user = await this.userModel.findOne({ email: doc.email })
    if (user) {
      throw new UnauthorizedException(
        `User already created with this ${doc.email}`,
      )
    }

    const newUser = new this.userModel(doc)
    await newUser.save()

    return { email: newUser.email }
  }

  async login(doc: LoginDTO): Promise<LoginRsp> {
    const user = await this.userModel.findOne({ email: doc.email })
    if (!user) throw new UnauthorizedException(`Invalid Credential`)

    const isMatch = user.validatePassword(doc.password)
    if (!isMatch) throw new UnauthorizedException(`Invalid Credential`)

    return {
      token: await this.jwtService.signAsync(user.createToken(), {
        expiresIn: '60s',
      }),
    }
  }

  async validateUser(id: string) {
    return await this.userModel.findById(id)
  }
}
