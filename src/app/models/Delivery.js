import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient'
    });
    this.belongsTo(models.Deliverymen, {
      foreignKey: 'deliverymen_id',
      as: 'deliverymen'
    });
  }
}

export default Delivery;
