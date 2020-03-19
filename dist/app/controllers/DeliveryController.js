"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Delivery_1 = tslib_1.__importDefault(require("@models/Delivery"));
const Recipient_1 = tslib_1.__importDefault(require("@models/Recipient"));
const DeliveryMan_1 = tslib_1.__importDefault(require("@models/DeliveryMan"));
const File_1 = tslib_1.__importDefault(require("@models/File"));
const Yup = tslib_1.__importStar(require("yup"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const NewDeliveryMail_1 = tslib_1.__importDefault(require("@jobs/NewDeliveryMail"));
const Queue_1 = tslib_1.__importDefault(require("@lib/Queue"));
const sequelize_1 = require("sequelize");
class DeliveryController {
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { product } = req.query;
            const response = yield Delivery_1.default.findAll({
                include: [DeliveryMan_1.default, Recipient_1.default, File_1.default],
                where: {
                    product: {
                        [sequelize_1.Op.like]: `%${product || ''}%`,
                    },
                },
                order: [['id', 'DESC']],
            });
            return res.json(response);
        });
    }
    show(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield Delivery_1.default.findByPk(req.params.id, {
                include: [DeliveryMan_1.default, Recipient_1.default],
            });
            return res.json(response);
        });
    }
    store(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                recipient_id: Yup.number().required(),
                deliveryman_id: Yup.number().required(),
                product: Yup.string().required(),
            });
            if (!(yield schema.isValid(req.body))) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Validations fails' });
            }
            const recipient = yield Recipient_1.default.findOne({
                where: { id: req.body.recipient_id },
            });
            if (!recipient) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Recipient does not exists' });
            }
            const deliveryman = yield DeliveryMan_1.default.findOne({
                where: { id: req.body.deliveryman_id },
            });
            if (!deliveryman) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Delivery man does not exists' });
            }
            const response = yield Delivery_1.default.create(req.body);
            yield Queue_1.default.add(NewDeliveryMail_1.default.key, {
                name: deliveryman.name,
                email: deliveryman.email,
                product: req.body.product,
                recipient: recipient.name,
            });
            return res.status(http_status_codes_1.default.CREATED).json(response);
        });
    }
    update(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = yield Delivery_1.default.findByPk(req.params.id);
            if (!model) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Delivery does not exists' });
            }
            const schema = Yup.object().shape({
                recipient_id: Yup.number(),
                deliveryman_id: Yup.number(),
                product: Yup.string(),
            });
            if (!(yield schema.isValid(req.body))) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Validations fails' });
            }
            if (req.body.recipient_id && req.body.recipient_id !== model.recipient_id) {
                const recipient = yield Recipient_1.default.findOne({
                    where: { id: req.body.recipient_id },
                });
                if (!recipient) {
                    return res
                        .status(http_status_codes_1.default.BAD_REQUEST)
                        .json({ error: 'Recipient does not exists' });
                }
            }
            if (req.body.deliveryman_id &&
                req.body.deliveryman_id !== model.deliveryman_id) {
                const deliveryman = yield DeliveryMan_1.default.findOne({
                    where: { id: req.body.deliveryman_id },
                });
                if (!deliveryman) {
                    return res
                        .status(http_status_codes_1.default.BAD_REQUEST)
                        .json({ error: 'Delivery man does not exists' });
                }
            }
            yield model.update(req.body);
            return res.json(model);
        });
    }
    delete(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = yield Delivery_1.default.findByPk(req.params.id);
            if (!model) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Delivery does not exists' });
            }
            yield model.destroy();
            return res.json({ meg: 'Delivery was deleted succesfully' });
        });
    }
}
exports.default = new DeliveryController();
//# sourceMappingURL=DeliveryController.js.map