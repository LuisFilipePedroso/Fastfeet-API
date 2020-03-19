module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliveryman', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'files',
        key: 'id',
        allowNull: true,
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliveryman', 'avatar_id');
  },
};
