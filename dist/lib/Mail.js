"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const path_1 = require("path");
const express_handlebars_1 = tslib_1.__importDefault(require("express-handlebars"));
const nodemailer_express_handlebars_1 = tslib_1.__importDefault(require("nodemailer-express-handlebars"));
const mail_1 = tslib_1.__importDefault(require("@config/mail"));
class Mail {
    constructor() {
        const { host, port, secure, auth } = mail_1.default;
        this.transporter = nodemailer_1.default.createTransport({
            host,
            port: Number(port),
            secure,
            auth,
        });
        this.configureTemplates();
    }
    configureTemplates() {
        const viewPath = path_1.resolve(__dirname, '..', 'app', 'views', 'emails');
        this.transporter.use('compile', nodemailer_express_handlebars_1.default({
            viewEngine: express_handlebars_1.default.create({
                layoutsDir: path_1.resolve(viewPath, 'layouts'),
                partialsDir: path_1.resolve(viewPath, 'partials'),
                defaultLayout: 'default',
                extname: '.hbs',
            }),
            viewPath,
            extName: '.hbs',
        }));
    }
    sendEmail(message) {
        return this.transporter.sendMail(Object.assign(Object.assign({}, mail_1.default.default), message));
    }
}
exports.default = new Mail();
//# sourceMappingURL=Mail.js.map