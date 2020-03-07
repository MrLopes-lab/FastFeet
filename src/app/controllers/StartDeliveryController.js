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

    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);

    await delivery.update({ start_date: new Date() }, { where: { id } });

    return res.json({
      delivery
    });
  }
}

export default new StartDeliveryController();
