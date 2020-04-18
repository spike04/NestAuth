import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LoginDTO } from './dto/LoginDTO'
import { RegisterDTO } from './dto/RegisterDTO'
import { LoginRsp, SignupRsp } from './interface/user.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signup(@Body() doc: RegisterDTO): Promise<SignupRsp> {
    return await this.authService.signup(doc)
  }

  @Post('login')
  async login(@Body() doc: LoginDTO): Promise<LoginRsp> {
    return await this.authService.login(doc)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Req() req) {
    return req.user
  }
}
