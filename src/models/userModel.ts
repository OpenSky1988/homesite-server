import { Document, Schema } from 'mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
    _id: number;
    active: boolean;
    email: string;
    password: string;
};

const saltRounds = 10;

type UserType = IUser & Document;

const UserSchema = new Schema({
    active: { type: Boolean, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const document = this as UserType;
        bcrypt.hash(document.password, saltRounds,
          function(err: Error, hashedPassword: string) {
          if (err) {
            next(err);
          }
          else {
            document.password = hashedPassword;
            next();
          }
        });
      } else {
        next();
      }
});

UserSchema.methods.isCorrectPassword = function (password: String, callback: (error: Error, same?: Boolean) => void) {
  bcrypt.compare(password, this.password, (error: Error, same: Boolean) => {
    if (error) {
      callback(error);
    } else {
      callback(error, same);
    }
  });
}

const userModel = mongoose.model('UserModel', UserSchema);

export { IUser, UserType };
export default userModel;
