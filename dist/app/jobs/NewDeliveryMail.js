"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Mail_1 = tslib_1.__importDefault(require("@lib/Mail"));
class NewDeliveryMail {
    get key() {
        return 'NewDeliveryMail';
    }
    handle({ data }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { name, email, product, recipient } = data;
            console.log('A fila executou');
            Mail_1.default.sendEmail({
                to: `${name} <${email}>`,
                subject: 'Nova encomenda',
                template: 'newDelivery',
                context: {
                    deliveryman: name,
                    product,
                    recipient,
                },
            });
        });
    }
}
exports.default = new NewDeliveryMail();
//# sourceMappingURL=NewDeliveryMail.js.map