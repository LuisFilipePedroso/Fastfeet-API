import { Request, Response } from 'express';
import DeliveryMan from '@models/DeliveryMan';
import * as Yup from 'yup';
import HttpStatus from 'http-status-codes';

class DeliveryManController {
  async index(req: Request, res: Response) {
    const response = await DeliveryMan.findAll();
    return res.json(response);
  }

  async show(req: Request, res: Response) {
    const response = await DeliveryMan.findByPk(req.params.id);
    return res.json(response);
  }

  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .max(155)
        .required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validations fails' });
    }

    const deliveryManExists = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExists) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Already exists a person signed with this email' });
    }

    const response = await DeliveryMan.create(req.body);
    return res.json(response);
  }

  async update(req: Request, res: Response) {
    const model = await DeliveryMan.findByPk(req.params.id);

    if (!model) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'DeliveryMan does not exists' });
    }

    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .max(155),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validations fails' });
    }

    await model.update(req.body);

    return res.json(model);
  }

  async delete(req: Request, res: Response) {
    const model = await DeliveryMan.findByPk(req.params.id);

    if (!model) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'DeliveryMan does not exists' });
    }

    await model.destroy();

    return res.json({ meg: 'DeliveryMan was deleted succesfully' });
  }
}

export default new DeliveryManController();
