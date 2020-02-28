import { Request, Response } from 'express';
import Delivery from '@models/Delivery';

import * as Yup from 'yup';

import HttpStatus from 'http-status-codes';

class EndDeliveryController {
  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!delivery) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Delivery not found' });
    }

    await delivery.update({
      end_date: new Date(),
      signature_id: req.body.signature_id,
    });

    return res.json(delivery);
  }
}

export default new EndDeliveryController();
