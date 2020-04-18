"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('deliveries', 'signature_id', {
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
        return queryInterface.removeColumn('deliveries', 'signature_id');
    },
};
//# sourceMappingURL=20200205002318-add_column_signature_to_delivery_table.js.map