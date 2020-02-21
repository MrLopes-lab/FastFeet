import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Verificar se exite um usuario com o email e senha informado
    const user = await User.findOne({ where: { email } });

    // Verifica email
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Verifica senha
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.secret
      })
    });
  }
}

export default new SessionController();
