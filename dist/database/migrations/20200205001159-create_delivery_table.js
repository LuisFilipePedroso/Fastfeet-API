"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('deliveries', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            recipient_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'recipients',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            },
            deliveryman_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'deliveryman',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            },
            product: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            canceled_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: true,
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
    down: queryInterface => queryInterface.dropTable('deliveries'),
};
//# sourceMappingURL=20200205001159-create_delivery_table.js.map