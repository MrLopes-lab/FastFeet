import Admin from '../models/Admin';

class AdminController {
  async index(req, res) {
    const admins = await Admin.findAll();

    return res.json(admins);
  }
}

export default new AdminController();
