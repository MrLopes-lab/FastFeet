// import * as Yup from 'yup';

// import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class DeliverymanController {
  async index(req, res) {
    const listDeliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id
      }
    });

    return res.json(listDeliveries);
  }
}

export default new DeliverymanController();
