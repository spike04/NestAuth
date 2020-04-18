import { User } from './../interface/user.interface'
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  },
)

UserSchema.pre<User>('save', function(next: Function) {
  if (!this.isModified('password')) return next()
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

UserSchema.methods = {
  validatePassword(password: string) {
    return bcrypt.compare(password, this.password)
  },

  createToken() {
    // Here we will create a token based on user's id and email
    return {
      id: this._id,
      email: this.email,
    }
  },
}
