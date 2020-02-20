import { Router } from 'express';

import SessionController from '@controllers/SessionController';
import RecipientController from '@controllers/RecipientController';
import DeliveryManController from '@controllers/DeliveryManController';
import DeliveryController from '@controllers/DeliveryController';

import authMiddleware from '@middlewares/auth';

const routes = Router();

routes.post('/auth', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipient', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.delete);

routes.get('/deliveryman', DeliveryManController.index);
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.delete);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

export default routes;
