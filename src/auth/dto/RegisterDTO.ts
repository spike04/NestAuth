import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}
