import { Router } from 'express';
import multer from 'multer';

import SessionController from '@controllers/SessionController';
import RecipientController from '@controllers/RecipientController';
import DeliveryManController from '@controllers/DeliveryManController';
import DeliveryController from '@controllers/DeliveryController';
import DeliveriesByDeliveryManController from '@controllers/DeliveriesByDeliveryManController';
import StartDeliveryController from '@controllers/StartDeliveryController';
import FinishDeliveryController from '@controllers/FinishDeliveryController';
import FileController from '@controllers/FileController';
import DeliveryProblemController from '@controllers/DeliveryProblemController';

import authMiddleware from '@middlewares/auth';
import multerConfig from '@config/multer';

const routes = Router();

const upload = multer(multerConfig);

routes.post('/auth', SessionController.store);

routes.get(
  '/deliveryman/:id/deliveries',
  DeliveriesByDeliveryManController.index
);
routes.get('/deliveryman/:id', DeliveryManController.show);

routes.get('/delivery/:id', DeliveryController.show);

routes.put('/delivery/:id/start', StartDeliveryController.update);
routes.put('/delivery/:id/finish', FinishDeliveryController.update);

routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.get('/recipient', RecipientController.index);
routes.get('/recipient/:id', RecipientController.show);
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

routes.get('/deliveries/problems', DeliveryProblemController.index);

routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

export default routes;
