import * as Yup from 'yup';

import Deliverymen from '../models/Deliverymen';

class DeliverymenController {
  // ***CRIAR UM NOVO ENTREGADOR***
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
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

  // ***LISTAR ENTREGADORES***
  async index(req, res) {
    const deliverymens = await Deliverymen.findAll();

    return res.json(deliverymens);
  }

  // ***UPDATE DE ENTREGADORES***
  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { email } = req.body;

    const deliverymen = await Deliverymen.findByPk(req.params.id);

    if (email === deliverymen.email) {
      return res.status(400).json({ error: 'Email already exists!' });
    }

    const { id, name } = await deliverymen.update(req.body);

    return res.json({
      id,
      name,
      email
    });
  }

  // ***REMOÇÃO DE ENTREGADOR***
  async delete(req, res) {
    const deliverymen = Deliverymen.findByPk(req.params.id);

    (await deliverymen).destroy();

    const { id, name, email } = await deliverymen;
    return res.json({
      id,
      name,
      email
    });
  }
}

export default new DeliverymenController();
