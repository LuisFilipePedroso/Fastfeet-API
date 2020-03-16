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
import IDeliveryMan from '@interfaces/DeliveryMan';

import Delivery from '@models/Delivery';

@Table({ modelName: 'deliveryman' })
class DeliveryMan extends Model<IDeliveryMan> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @IsNumeric
  @HasMany(() => Delivery, {
    foreignKey: 'deliveryman_id',
    as: 'deliveryman',
  })
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(true)
  @Column
  avatar_id: number;

  @AllowNull(false)
  @Column
  email: string;
}

export default DeliveryMan;
