import { isWithinInterval, setHours } from 'date-fns';
import Delivery from '../models/Delivery';

class StartDeliveryController {
  async update(req, res) {
    const date = new Date();

    const period_date = isWithinInterval(date, {
      start: setHours(new Date(), 8),
      end: setHours(new Date(), 22)
    });

    if (!period_date) {
      return res.status(400).json({ error: 'outside opening hours' });
    }

    const { signature_id } = req.body;
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);

    await delivery.update({ end_date: new Date(), signature_id });

    return res.json({
      delivery
    });
  }
}

export default new StartDeliveryController();
