import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import AdminController from './app/controllers/AdminController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Middleware de autenticação com token

routes.get('/admins', AdminController.index);
routes.post('/recipient', RecipientController.store);

export default routes;
