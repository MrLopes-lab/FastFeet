import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // transforma uma função de callback em async

import authConfig from '../../config/auth';

// Autenticação utilizando o token gerado
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid!' });
  }
};
