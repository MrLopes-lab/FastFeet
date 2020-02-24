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
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Middleware de autenticação com token

routes.get('/admins', AdminController.index);
routes.post('/recipient', RecipientController.store);

routes.post('/files', upload.single('file'), FileController.store);
routes.post('/deliverymen', DeliverymenController.store);

export default routes;
