"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
app_1.default.listen(3333, () => {
    console.log('Server is listening on port 3333');
});
//# sourceMappingURL=server.js.map