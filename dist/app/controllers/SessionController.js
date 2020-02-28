"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const Yup = tslib_1.__importStar(require("yup"));
const User_1 = tslib_1.__importDefault(require("@models/User"));
const auth_1 = tslib_1.__importDefault(require("@config/auth"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
class SessionController {
    store(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required(),
                password: Yup.string().required(),
            });
            if (!(yield schema.isValid(req.body))) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Validation fails' });
            }
            const { email, password } = req.body;
            const user = yield User_1.default.findOne({ where: { email } });
            if (!user) {
                return res
                    .status(http_status_codes_1.default.UNAUTHORIZED)
                    .json({ error: 'User does not exists' });
            }
            if (!(yield user.comparePassword(password))) {
                return res
                    .status(http_status_codes_1.default.UNAUTHORIZED)
                    .json({ error: 'Password does not match' });
            }
            const { id, name } = user;
            return res.json({
                user: {
                    id,
                    name,
                    email,
                },
                token: jsonwebtoken_1.default.sign({ id }, auth_1.default.secret, {
                    expiresIn: auth_1.default.expiresIn,
                }),
            });
        });
    }
}
exports.default = new SessionController();
//# sourceMappingURL=SessionController.js.map