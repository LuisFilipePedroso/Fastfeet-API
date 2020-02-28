"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const File_1 = tslib_1.__importDefault(require("@models/File"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
class FileController {
    store(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const { originalname: name, filename: path } = req.file;
            const file = yield File_1.default.create({
                name,
                path,
            });
            return res.status(http_status_codes_1.default.CREATED).json(file);
        });
    }
}
exports.default = new FileController();
//# sourceMappingURL=FileController.js.map