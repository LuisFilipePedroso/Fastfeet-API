import { Request, Response } from 'express';
import Delivery from '@models/Delivery';
import Recipient from '@models/Recipient';
import DeliveryMan from '@models/DeliveryMan';

import * as Yup from 'yup';
import HttpStatus from 'http-status-codes';

class DeliveryController {
  async index(req: Request, res: Response) {
    const response = await Delivery.findAll({
      include: [DeliveryMan, Recipient],
    });
    return res.json(response);
  }

  async show(req: Request, res: Response) {
    const response = await Delivery.findByPk(req.params.id, {
      include: [DeliveryMan, Recipient],
    });
    return res.json(response);
  }

  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validations fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });

    if (!recipientExists) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Recipient does not exists' });
    }

    const deliveryManExists = await DeliveryMan.findOne({
      where: { id: req.body.deliveryman_id },
    });

    if (!deliveryManExists) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delivery man does not exists' });
    }

    const response = await Delivery.create(req.body);
    return res.json(response);
  }

  async update(req: Request, res: Response) {
    const model = await Delivery.findByPk(req.params.id);

    if (!model) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delivery does not exists' });
    }

    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validations fails' });
    }

    if (req.body.recipient_id && req.body.recipient_id !== model.recipient_id) {
      const recipientExists = await Recipient.findOne({
        where: { id: req.body.recipient_id },
      });

      if (!recipientExists) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Recipient does not exists' });
      }
    }

    if (
      req.body.deliveryman_id &&
      req.body.deliveryman_id !== model.deliveryman_id
    ) {
      const deliveryManExists = await DeliveryMan.findOne({
        where: { id: req.body.deliveryman_id },
      });

      if (!deliveryManExists) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Delivery man does not exists' });
      }
    }

    await model.update(req.body);

    return res.json(model);
  }

  async delete(req: Request, res: Response) {
    const model = await Delivery.findByPk(req.params.id);

    if (!model) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delivery does not exists' });
    }

    await model.destroy();

    return res.json({ meg: 'Delivery was deleted succesfully' });
  }
}

export default new DeliveryController();
