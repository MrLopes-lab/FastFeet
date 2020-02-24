import * as Yup from 'yup';

import Deliverymen from '../models/Deliverymen';

class DeliverymenController {
  // CRIAR UM NOVO ENTREGADOR
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required()
    });

    // Validação do req.body
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    // Gravar no banco de dados
    const { name, email } = await Deliverymen.create(req.body);

    return res.json({
      name,
      email
    });
  }
}

export default new DeliverymenController();
