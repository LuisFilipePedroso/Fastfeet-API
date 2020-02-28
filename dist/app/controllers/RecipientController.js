"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Recipient_1 = tslib_1.__importDefault(require("@models/Recipient"));
const Yup = tslib_1.__importStar(require("yup"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const sequelize_1 = require("sequelize");
class RecipientController {
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { name } = req.query;
            if (name) {
                const response = yield Recipient_1.default.findAll({
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `${name}`,
                        },
                    },
                });
                return res.json(response);
            }
            const response = yield Recipient_1.default.findAll();
            return res.json(response);
        });
    }
    show(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield Recipient_1.default.findByPk(req.params.id);
            return res.json(response);
        });
    }
    store(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                name: Yup.string()
                    .min(3)
                    .max(155)
                    .required(),
                street: Yup.string()
                    .min(3)
                    .max(155)
                    .required(),
                number: Yup.number().required(),
                complement: Yup.string()
                    .max(80)
                    .required(),
                state: Yup.string()
                    .max(2)
                    .required(),
                city: Yup.string()
                    .max(80)
                    .required(),
                postal_code: Yup.string()
                    .max(9)
                    .required(),
            });
            if (!(yield schema.isValid(req.body))) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Validations fails' });
            }
            const response = yield Recipient_1.default.create(req.body);
            return res.status(http_status_codes_1.default.CREATED).json(response);
        });
    }
    update(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = yield Recipient_1.default.findByPk(req.params.id);
            if (!model) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Recipient does not exists' });
            }
            const schema = Yup.object().shape({
                name: Yup.string()
                    .min(3)
                    .max(155),
                street: Yup.string()
                    .min(3)
                    .max(155)
                    .required(),
                number: Yup.number().required(),
                complement: Yup.string().max(80),
                state: Yup.string()
                    .max(2)
                    .required(),
                city: Yup.string().max(80),
                postal_code: Yup.string().max(9),
            });
            if (!(yield schema.isValid(req.body))) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Validations fails' });
            }
            yield model.update(req.body);
            return res.json(model);
        });
    }
    delete(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = yield Recipient_1.default.findByPk(req.params.id);
            if (!model) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Recipient does not exists' });
            }
            yield model.destroy();
            return res.json({ meg: 'Recipient was deleted succesfully' });
        });
    }
}
exports.default = new RecipientController();
//# sourceMappingURL=RecipientController.js.map