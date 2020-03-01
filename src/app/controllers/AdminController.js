import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class AdminController {
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
    const { name, email } = await Deliveryman.create(req.body);

    return res.json({
      name,
      email
    });
  }

  // ***LISTAR ENTREGADORES***
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll();

    return res.json(deliverymen);
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

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: "Delivery Man doesn't exist!" });
    }

    if (email === deliveryman.email) {
      return res.status(400).json({ error: 'Email already exists!' });
    }

    const { id, name } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email
    });
  }

  // ***REMOÇÃO DE ENTREGADOR***
  async delete(req, res) {
    const deliverymen = Deliveryman.findByPk(req.params.id);

    (await deliverymen).destroy();

    const { id, name, email } = await deliverymen;
    return res.json({
      id,
      name,
      email
    });
  }
}

export default new AdminController();
