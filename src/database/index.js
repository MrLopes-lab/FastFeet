import Sequelize from 'sequelize';

import Admin from '../app/models/Admin';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliveymen from '../app/models/Deliverymen';

import databaseConfig from '../config/database';

const models = [Admin, Recipient, File, Deliveymen];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
