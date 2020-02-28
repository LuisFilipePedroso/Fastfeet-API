"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('recipients', {
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
            street: {
                type: Sequelize.STRING(155),
                allowNull: false,
            },
            number: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING(2),
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            postal_code: {
                type: Sequelize.STRING(9),
                allowNull: false,
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
    down: queryInterface => queryInterface.dropTable('recipients'),
};
//# sourceMappingURL=20200204235129-create_recipient_table.js.map