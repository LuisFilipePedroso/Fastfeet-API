"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('deliveryman', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(155),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(155),
                allowNull: false,
                unique: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },
    down: queryInterface => queryInterface.dropTable('deliveryman'),
};
//# sourceMappingURL=20200204235927-create_deliveryman_table.js.map