module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliverymens', 'deleted_at', {
      type: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymens', 'deleted_at');
  }
};
