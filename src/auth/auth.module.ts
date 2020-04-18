import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './passport/jwt.stragegy'
import { UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    JwtModule.register({ secret: process.env.SECRET }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
