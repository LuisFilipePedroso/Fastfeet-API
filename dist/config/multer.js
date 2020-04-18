"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const multer_1 = tslib_1.__importDefault(require("multer"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const path_1 = require("path");
exports.default = {
    storage: multer_1.default.diskStorage({
        destination: path_1.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, res) => {
                if (err)
                    return cb(err, '');
                return cb(null, res.toString('hex') + path_1.extname(file.originalname));
            });
        },
    }),
    limits: { fieldSize: 25 * 1024 * 1024 },
};
//# sourceMappingURL=multer.js.map