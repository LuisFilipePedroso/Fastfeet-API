"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const util_1 = require("util");
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const auth_1 = tslib_1.__importDefault(require("@config/auth"));
exports.default = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(http_status_codes_1.default.BAD_REQUEST)
            .json({ error: 'Token not provided' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = (yield util_1.promisify(jsonwebtoken_1.default.verify)(token, auth_1.default.secret));
        // @ts-ignore
        req.userId = decoded.id;
        return next();
    }
    catch (e) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: 'Invalid Token' });
    }
});
//# sourceMappingURL=auth.js.map