import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsNumeric,
  AllowNull,
  HasMany,
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
}

export default File;
