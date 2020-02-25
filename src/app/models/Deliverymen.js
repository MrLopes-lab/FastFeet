import Sequelize, { Model } from 'sequelize';

class Deliverymens extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING
      },
      {
        sequelize,
        paranoid: true
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Files, { foreignKey: 'avatar_id' });
  }
}

export default Deliverymens;
