import { Sequelize } from 'sequelize-typescript';

import Recipient from '@models/Recipient';
import User from '@models/User';
import DeliveryMan from '@models/DeliveryMan';
import Delivery from '@models/Delivery';
import File from '@models/File';
import DeliveryProblem from '@models/DeliveryProblem';

class Database {
  private connection: Sequelize;

  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_DOCKER_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Recipient, User, DeliveryMan, Delivery, File, DeliveryProblem],
      define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
      },
    });
  }
}

export default new Database();
