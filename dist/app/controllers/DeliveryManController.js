"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DeliveryMan_1 = tslib_1.__importDefault(require("@models/DeliveryMan"));
const File_1 = tslib_1.__importDefault(require("@models/File"));
const Yup = tslib_1.__importStar(require("yup"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const sequelize_1 = require("sequelize");
class DeliveryManController {
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { name } = req.query;
            if (name) {
                const response = yield DeliveryMan_1.default.findAll({
                    include: [File_1.default],
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `%${name}%`,
                        },
                    },
                });
                return res.json(response);
            }
            const response = yield DeliveryMan_1.default.findAll();
            return res.json(response);
        });
    }
    show(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield DeliveryMan_1.default.findByPk(req.params.id, {
                include: [File_1.default],
            });
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
                email: Yup.string()
                    .email()
                    .required(),
            });
            if (!(yield schema.isValid(req.body))) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Validations fails' });
            }
            const deliveryManExists = yield DeliveryMan_1.default.findOne({
                where: { email: req.body.email },
            });
            if (deliveryManExists) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Already exists a person signed with this email' });
            }
            const response = yield DeliveryMan_1.default.create(req.body);
            return res.status(http_status_codes_1.default.CREATED).json(response);
        });
    }
    update(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = yield DeliveryMan_1.default.findByPk(req.params.id);
            if (!model) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'DeliveryMan does not exists' });
            }
            const schema = Yup.object().shape({
                name: Yup.string()
                    .min(3)
                    .max(155),
                email: Yup.string().email(),
                avatar_id: Yup.number(),
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
            const model = yield DeliveryMan_1.default.findByPk(req.params.id);
            if (!model) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'DeliveryMan does not exists' });
            }
            yield model.destroy();
            return res.json({ meg: 'DeliveryMan was deleted succesfully' });
        });
    }
}
exports.default = new DeliveryManController();
//# sourceMappingURL=DeliveryManController.js.map