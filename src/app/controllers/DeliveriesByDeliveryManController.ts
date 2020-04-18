import { Request, Response } from 'express';
import Delivery from '@models/Delivery';

import { Op } from 'sequelize';

import HttpStatus from 'http-status-codes';

import Recipient from '@models/Recipient';
import DeliveryMan from '@models/DeliveryMan';

const query = {
  pending: (deliveryman_id: number) =>
    Delivery.findAll({
      include: [DeliveryMan, Recipient],
      where: {
        deliveryman_id,
        end_date: null,
        canceled_at: null,
      },
    }),
  done: (deliveryman_id: number) =>
    Delivery.findAll({
      include: [DeliveryMan, Recipient],
      where: {
        deliveryman_id,
        [Op.or]: [
          {
            end_date: {
              [Op.ne]: null,
            },
          },
          {
            canceled_at: {
              [Op.ne]: null,
            },
          },
        ],
      },
    }),
};

class DeliveriesByDeliveryManController {
  async index(req: Request, res: Response) {
    if (!(req.query && req.query.status)) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'You must have to inform the status on query params' });
    }

    const key: string = Object.values<string>(req.query).toString();

    const request = query[key];
    const response = await request(req.params.id);

    return res.json(response);
  }
}

export default new DeliveriesByDeliveryManController();
