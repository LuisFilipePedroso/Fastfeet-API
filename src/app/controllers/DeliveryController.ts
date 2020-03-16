import { Request, Response } from 'express';
import Delivery from '@models/Delivery';
import Recipient from '@models/Recipient';
import DeliveryMan from '@models/DeliveryMan';
import File from '@models/File';

import * as Yup from 'yup';
import HttpStatus from 'http-status-codes';

import NewDeliveryMail from '@jobs/NewDeliveryMail';
import Queue from '@lib/Queue';

import { Op } from 'sequelize';

class DeliveryController {
  async index(req: Request, res: Response) {
    const { product } = req.query;

    const response = await Delivery.findAll({
      include: [DeliveryMan, Recipient, File],
      where: {
        product: {
          [Op.like]: `%${product || ''}%`,
        },
      },
      order: [['id', 'DESC']],
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

    const recipient = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });

    if (!recipient) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Recipient does not exists' });
    }

    const deliveryman = await DeliveryMan.findOne({
      where: { id: req.body.deliveryman_id },
    });

    if (!deliveryman) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delivery man does not exists' });
    }

    const response = await Delivery.create(req.body);

    await Queue.add(NewDeliveryMail.key, {
      name: deliveryman.name,
      email: deliveryman.email,
      product: req.body.product,
      recipient: recipient.name,
    });

    return res.status(HttpStatus.CREATED).json(response);
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
      const recipient = await Recipient.findOne({
        where: { id: req.body.recipient_id },
      });

      if (!recipient) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Recipient does not exists' });
      }
    }

    if (
      req.body.deliveryman_id &&
      req.body.deliveryman_id !== model.deliveryman_id
    ) {
      const deliveryman = await DeliveryMan.findOne({
        where: { id: req.body.deliveryman_id },
      });

      if (!deliveryman) {
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
