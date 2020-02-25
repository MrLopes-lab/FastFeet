import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import AdminController from './app/controllers/AdminController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymenController from './app/controllers/DeliverymenController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig); // Envio de arquivos

// *** CRIAÇÃO DE SESSÃO ADMIN
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Middleware de autenticação com token

// *** LISTA DE ADMINS
routes.get('/admins', AdminController.index);

// *** CRIAÇÃO DE DESTINOS
routes.post('/recipient', RecipientController.store);

// *** CRIAÇÃO, EDIÇÃO, LISTAGEM E DELETE DE ENTREGADORES
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/deliverymen', DeliverymenController.store);
routes.get('/deliverymen', DeliverymenController.index);
routes.put('/deliverymen/:id', DeliverymenController.update);
routes.delete('/deliverymen/:id', DeliverymenController.delete);

export default routes;
