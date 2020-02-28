"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
let User = class User extends sequelize_typescript_1.Model {
    comparePassword(password) {
        return bcryptjs_1.default.compare(password, this.password_hash);
    }
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.IsNumeric,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.IsEmail,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "password_hash", void 0);
User = tslib_1.__decorate([
    sequelize_typescript_1.Table({ modelName: 'users' })
], User);
exports.default = User;
//# sourceMappingURL=User.js.map