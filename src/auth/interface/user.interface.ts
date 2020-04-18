import { Document } from 'mongoose'

export interface User extends Document {
  email: string
  password: string

  validatePassword(password: string): Promise<boolean>
  createToken(): string
}

export interface SignupRsp {
  readonly email: string
}

export interface LoginRsp {
  readonly token: string
}
