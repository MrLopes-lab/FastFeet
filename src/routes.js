import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import AdminController from './app/controllers/AdminController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanController from './app/controllers/DeliverymanController';
import StartDeliveryController from './app/controllers/StartDeliveryController';
import EndDeliveryController from './app/controllers/EndDeliveryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

//------------------------------------------------------------------------------

// *** ENTREGADOR ***

// --LISTAGEM DE ENTREGAS--
routes.get('/deliveryman/:id', DeliverymanController.index);

// --START DE ENCOMENDA--
routes.put('/deliveryman/:id/start-delivery', StartDeliveryController.update);

// --END DE ENCOMENDA--
routes.post(
  '/deliveryman/:id/file-signature',
  upload.single('signature'),
  FileController.store
);
routes.put('/deliveryman/:id/end-delivery', EndDeliveryController.update);

//------------------------------------------------------------------------------

// ==CRIAÇÃO DE SESSÃO ADMIN==
routes.post('/sessions', SessionController.store);

// *** ADMINISTRADOR ***

routes.use(authMiddleware); // Middleware de autenticação com token

// --CRIAÇÃO, LISTAGEM DE DESTINOS--
routes.post('/recipient', RecipientController.store);
routes.get('/recipient', RecipientController.index);

// --CRIAÇÃO, EDIÇÃO, LISTAGEM E DELETE DE ENTREGADORES--
routes.post(
  '/admin/file-deliveryman',
  upload.single('file'),
  FileController.store
);
routes.post('/admin/deliveryman', AdminController.store);
routes.get('/admin/deliveryman', AdminController.index);
routes.put('/admin/deliveryman/:id', AdminController.update);
routes.delete('/admin/deliveryman/:id', AdminController.delete);

// --CRIAÇÃO, EDIÇÃO, LISTAGEM E DELETE DE ENTREGAS--
routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

export default routes;
