import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  IsNumeric,
} from 'sequelize-typescript';

import IDeliveryProblem from '@interfaces/DeliveryProblem';

import Delivery from '@models/Delivery';

@Table({ modelName: 'delivery_problems' })
class DeliveryProblem extends Model<IDeliveryProblem> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @IsNumeric
  @Column
  id: number;

  @AllowNull(false)
  @BelongsTo(() => Delivery, {
    foreignKey: 'delivery_id',
    as: 'delivery',
  })
  @Column
  delivery_id: number;

  @AllowNull(false)
  @Column
  description: string;
}

export default DeliveryProblem;
