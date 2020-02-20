module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('recipients', 'address', 'complement', {
      type: Sequelize.STRING(80),
    });
  },

  down: queryInterface =>
    queryInterface.renameColumn('recipients', 'complement', 'address'),
};
