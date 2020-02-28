import { Request, Response } from 'express';
import File from '@models/File';

import HttpStatus from 'http-status-codes';

class FileController {
  async store(req: Request, res: Response) {
    // @ts-ignore
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.status(HttpStatus.CREATED).json(file);
  }
}

export default new FileController();
