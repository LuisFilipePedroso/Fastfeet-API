import 'dotenv/config';

import express, { Application } from 'express';
import cors from 'cors';

import { resolve } from 'path';

import routes from './routes';

import './database';

class App {
  server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
