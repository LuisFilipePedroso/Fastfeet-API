import { Request, Response } from 'express';
import Recipient from '@models/Recipient';
import * as Yup from 'yup';
import HttpStatus from 'http-status-codes';

class RecipientController {
  async index(req: Request, res: Response) {
    const response = await Recipient.findAll();
    return res.send(response);
  }

  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .max(155)
        .required(),
      street: Yup.string()
        .min(3)
        .max(155)
        .required(),
      number: Yup.number().required(),
      complement: Yup.string()
        .max(80)
        .required(),
      state: Yup.string()
        .max(2)
        .required(),
      city: Yup.string()
        .max(80)
        .required(),
      postal_code: Yup.string()
        .max(9)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validations fails' });
    }

    const response = await Recipient.create(req.body);
    return res.json(response);
  }

  async update(req: Request, res: Response) {
    const model = await Recipient.findByPk(req.params.id);

    if (!model) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Recipient does not exists' });
    }

    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .max(155),
      street: Yup.string()
        .min(3)
        .max(155)
        .required(),
      number: Yup.number().required(),
      complement: Yup.string().max(80),
      state: Yup.string()
        .max(2)
        .required(),
      city: Yup.string().max(80),
      postal_code: Yup.string().max(9),
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
    const model = await Recipient.findByPk(req.params.id);

    if (!model) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Recipient does not exists' });
    }

    await model.destroy();

    return res.json({ meg: 'Recipient was deleted succesfully' });
  }
}

export default new RecipientController();
