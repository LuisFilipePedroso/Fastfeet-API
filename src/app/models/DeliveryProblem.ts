import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  IsNumeric,
} from 'sequelize-typescript';

import IDeliveryProblem from '@interfaces/DeliveryProblem';

@Table({ modelName: 'delivery_problems' })
class DeliveryProblem extends Model<IDeliveryProblem> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @IsNumeric
  @Column
  id: number;

  @AllowNull(false)
  @IsNumeric
  @Column
  delivery_id: number;

  @AllowNull(false)
  @Column
  description: string;
}

export default DeliveryProblem;
