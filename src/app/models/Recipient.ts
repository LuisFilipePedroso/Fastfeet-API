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
import IRecipient from '@interfaces/Recipient';

import Delivery from '@models/Delivery';

@Table({ modelName: 'recipients' })
class Recipient extends Model<IRecipient> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @IsNumeric
  @HasMany(() => Delivery, {
    foreignKey: 'deliveryman_id',
    as: 'deliverymanId',
  })
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  street: string;

  @AllowNull(false)
  @Column
  number: number;

  @AllowNull(false)
  @Column
  complement: string;

  @AllowNull(false)
  @Column
  state: string;

  @AllowNull(false)
  @Column
  city: string;

  @AllowNull(false)
  @Column
  postal_code: string;
}

export default Recipient;
