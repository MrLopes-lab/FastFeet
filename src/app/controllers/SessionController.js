import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Admin from '../models/Admin';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }

    const { email, password } = req.body;

    // Verificar se exite um usuario com o email e senha informado
    const admin = await Admin.findOne({ where: { email } });

    // Verifica email
    if (!admin) {
      return res.status(401).json({ error: 'admin not found' });
    }

    // Verifica senha
    if (!(await admin.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = admin;

    return res.json({
      admin: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
