import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsNumeric,
  AllowNull,
  HasMany,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import IDelivery from '@interfaces/Delivery';

import Recipient from '@models/Recipient';
import DeliveryMan from '@models/DeliveryMan';
import File from '@models/File';

@Table({ modelName: 'deliveries' })
class Delivery extends Model<IDelivery> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @IsNumeric
  @Column
  id: number;

  @AllowNull(false)
  @BelongsTo(() => Recipient, {
    foreignKey: 'recipient_id',
    as: 'recipientId',
  })
  @Column
  recipient_id: number;

  @AllowNull(false)
  @BelongsTo(() => DeliveryMan, {
    foreignKey: 'deliveryman_id',
    as: 'deliverymanId',
  })
  @Column
  deliveryman_id: number;

  @AllowNull(true)
  @BelongsTo(() => File, {
    foreignKey: 'signature_id',
    as: 'signatureId',
  })
  @Column
  signature_id?: number;

  @AllowNull(false)
  @Column
  product: string;

  @AllowNull(true)
  @Column
  canceled_at?: Date;

  @AllowNull(true)
  @Column
  start_date?: Date;

  @AllowNull(true)
  @Column
  end_date?: Date;
}

export default Delivery;
