module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('deliverymen', 'deliverymens');
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliverymen', 'deliverymens');
  }
};
