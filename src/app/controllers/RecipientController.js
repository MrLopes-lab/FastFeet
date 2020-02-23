import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  // CRIAR NOVO DESTINATARIO
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required()
    });

    // Validação do req.body
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const {
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    } = await Recipient.create(req.body);

    return res.json({
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    });
  }
}

export default new RecipientController();
