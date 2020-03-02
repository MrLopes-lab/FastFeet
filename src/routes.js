import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import AdminController from './app/controllers/AdminController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanController from './app/controllers/DeliverymanController'; // Envio de arquivos

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// *** LISTAGEM DE ENTREGAS - ENTREGADOR ***
routes.get('/deliveryman/:id/deliveries', DeliverymanController.index);

// *** CRIAÇÃO DE SESSÃO ADMIN
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Middleware de autenticação com token

// *** CRIAÇÃO, LISTAGEM DE DESTINOS
routes.post('/recipient', RecipientController.store);
routes.get('/recipient', RecipientController.index);

// *** CRIAÇÃO, EDIÇÃO, LISTAGEM E DELETE DE ENTREGADORES
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/deliveryman', AdminController.store);
routes.get('/deliveryman', AdminController.index);
routes.put('/deliveryman/:id', AdminController.update);
routes.delete('/deliveryman/:id', AdminController.delete);

// *** CRIAÇÃO, EDIÇÃO, LISTAGEM E DELETE DE ENTREGAS
routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

export default routes;
