import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsNumeric,
  AllowNull,
  DataType,
} from 'sequelize-typescript';

import IFile from '@interfaces/File';

@Table({ modelName: 'files' })
class File extends Model<IFile> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @IsNumeric
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  path: string;

  @Column(DataType.VIRTUAL)
  get url() {
    return `${process.env.APP_URL}/files/${this.path}`;
  }
}

export default File;
