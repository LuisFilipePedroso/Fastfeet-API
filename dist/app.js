"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const path_1 = require("path");
const routes_1 = tslib_1.__importDefault(require("./routes"));
require("./database");
class App {
    constructor() {
        this.server = express_1.default();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(express_1.default.json());
        this.server.use(cors_1.default());
        this.server.use('/files', express_1.default.static(path_1.resolve(__dirname, '..', 'tmp', 'uploads')));
    }
    routes() {
        this.server.use(routes_1.default);
    }
}
exports.default = new App().server;
//# sourceMappingURL=app.js.map