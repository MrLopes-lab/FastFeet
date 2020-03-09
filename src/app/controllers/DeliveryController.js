import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

import Mail from '../../lib/Mail';

class DeliveryController {
  // ***CRIAR UMA NOVA ENTREGA***
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = await Delivery.create(
      req.body
    );

    const { name, email } = await Deliveryman.findByPk(req.body.deliveryman_id);

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Entrega disponivel para retirada',
      text: 'Você pode se dirigir à central'
    });

    return res.json({
      recipient_id,
      deliveryman_id,
      product
    });
  }

  // ***LISTAR ENTREGAS***
  async index(req, res) {
    const delyveries = await Delivery.findAll();

    return res.json(delyveries);
  }

  // ***UPDATE DE ENTREGA***
  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: "Delivery Man doesn't exist!" });
    }

    const update_at = new Date();

    const { recipient_id, deliveryman_id, product } = await delivery.update(
      req.body
    );

    return res.json({
      recipient_id,
      deliveryman_id,
      product,
      update_at
    });
  }

  // ***REMOÇÃO DE ENTREGADOR***
  async delete(req, res) {
    const delivery = Delivery.findByPk(req.params.id);

    (await delivery).destroy();

    const { id } = await delivery;
    return res.json({
      id
    });
  }
}

export default new DeliveryController();
