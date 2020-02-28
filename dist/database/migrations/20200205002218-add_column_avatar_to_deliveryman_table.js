"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('deliveryman', 'avatar_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'files',
                key: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
        });
    },
    down: queryInterface => {
        return queryInterface.removeColumn('deliveryman', 'avatar_id');
    },
};
//# sourceMappingURL=20200205002218-add_column_avatar_to_deliveryman_table.js.map