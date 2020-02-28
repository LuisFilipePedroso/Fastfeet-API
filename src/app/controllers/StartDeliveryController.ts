import { Request, Response } from 'express';

import MaxDeliveryService from '@services/MaxDelivery';

import Delivery from '@models/Delivery';

import HttpStatus from 'http-status-codes';

class StartDeliveryController {
  async update(req: Request, res: Response) {
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

    const qtyOfDeliveries = await MaxDeliveryService.get(
      `${delivery.deliveryman_id}`
    );

    if (qtyOfDeliveries && qtyOfDeliveries > 5) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ error: 'You can only delivery 5 deliveries per day' });
    }

    await delivery.update({
      start_date: new Date(),
    });

    await MaxDeliveryService.set(
      `${delivery.deliveryman_id.toString()}`,
      qtyOfDeliveries + 1
    );

    return res.status(HttpStatus.CREATED).json(delivery);
  }
}

export default new StartDeliveryController();
