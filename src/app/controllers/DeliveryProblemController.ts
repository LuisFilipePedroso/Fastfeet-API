import { Request, Response } from 'express';
import DeliveryProblem from '@models/DeliveryProblem';
import Delivery from '@models/Delivery';
import DeliveryMan from '@models/DeliveryMan';

import * as Yup from 'yup';

import HttpStatus from 'http-status-codes';

import CancelDeliveryMail from '@jobs/CancelDeliveryMail';
import Queue from '@lib/Queue';

class DeliveryProblemController {
  async index(req: Request, res: Response) {
    const response = await DeliveryProblem.findAll();
    return res.json(response);
  }

  async show(req: Request, res: Response) {
    const response = await DeliveryProblem.findAll({
      where: {
        delivery_id: req.params.id,
      },
    });
    return res.json(response);
  }

  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delivery does not exists' });
    }

    if (delivery?.canceled_at) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delivery was already canceled' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: req.params.id,
      description: req.body.description,
    });

    return res.status(HttpStatus.CREATED).json(deliveryProblem);
  }

  async delete(req: Request, res: Response) {
    const deliveryProblem = await DeliveryProblem.findByPk(req.params.id);

    if (!deliveryProblem) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delivery problem does not exists' });
    }

    const delivery = await Delivery.findByPk(deliveryProblem.delivery_id);

    if (delivery?.canceled_at) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delivery was already canceled' });
    }

    const deliveryman = await DeliveryMan.findByPk(delivery?.deliveryman_id);

    await Queue.add(CancelDeliveryMail.key, {
      name: deliveryman?.name,
      email: deliveryman?.email,
      delivery: delivery?.id,
    });

    await delivery?.update({ canceled_at: new Date() });

    return res.json({ success: 'Delivery was canceled successfully' });
  }
}

export default new DeliveryProblemController();
