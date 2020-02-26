import Sequelize from 'sequelize';

import Admin from '../app/models/Admin';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliverymen from '../app/models/Deliverymen';
import Delivery from '../app/models/Delivery';

import databaseConfig from '../config/database';

const models = [Admin, Recipient, File, Deliverymen, Delivery];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
