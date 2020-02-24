module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('admin', 'admins');
  },

  down: queryInterface => {
    return queryInterface.dropTable('admin', 'admins');
  }
};
