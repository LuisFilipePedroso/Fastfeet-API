"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');
module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert('users', [
            {
                name: 'Distruidora FastFeet',
                email: 'admin@fastfeet.com',
                password_hash: bcrypt.hashSync('123456', 8),
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], {});
    },
    down: () => { },
};
//# sourceMappingURL=20200131005933-admin-user.js.map