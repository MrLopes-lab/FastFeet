import * as Yup from 'yup';

import Delivery from '../models/Delivery';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliverymen_id: Yup.number().required(),
      product: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliverymen_id, product } = await Delivery.create(
      req.body
    );

    return res.json({
      recipient_id,
      deliverymen_id,
      product
    });
  }
}

export default new DeliveryController();
