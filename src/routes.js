import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import AdminController from './app/controllers/AdminController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/admins', AdminController.index);

export default routes;
