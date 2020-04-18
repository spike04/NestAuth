import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    })
  }

  async validate(payload: any) {
    if (this.authService.validateUser(payload.id)) {
      return { userId: payload.id, email: payload.email }
    } else {
      throw new UnauthorizedException('UnAuthorized')
    }
  }
}
