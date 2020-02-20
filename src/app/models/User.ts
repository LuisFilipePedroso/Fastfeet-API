import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsNumeric,
  AllowNull,
  IsEmail,
} from 'sequelize-typescript';
import IUser from '@interfaces/User';

import bcrypt from 'bcryptjs';

@Table({ modelName: 'users' })
class User extends Model<IUser> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @IsNumeric
  @Column
  public id: number;

  @AllowNull(false)
  @Column
  public name: string;

  @AllowNull(false)
  @IsEmail
  @Column
  public email: string;

  @AllowNull(false)
  @Column
  public password_hash: string;

  comparePassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
