"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
let File = class File extends sequelize_typescript_1.Model {
    get url() {
        return `${process.env.APP_URL}/files/${this.path}`;
    }
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.IsNumeric,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], File.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], File.prototype, "name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], File.prototype, "path", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.VIRTUAL),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], File.prototype, "url", null);
File = tslib_1.__decorate([
    sequelize_typescript_1.Table({ modelName: 'files' })
], File);
exports.default = File;
//# sourceMappingURL=File.js.map