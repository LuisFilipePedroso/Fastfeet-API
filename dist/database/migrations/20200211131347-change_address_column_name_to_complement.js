"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('recipients', 'address', 'complement', {
            type: Sequelize.STRING(80),
        });
    },
    down: queryInterface => queryInterface.renameColumn('recipients', 'complement', 'address'),
};
//# sourceMappingURL=20200211131347-change_address_column_name_to_complement.js.map