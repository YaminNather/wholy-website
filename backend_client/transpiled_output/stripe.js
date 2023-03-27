"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stripe = void 0;
const axios_1 = __importDefault(require("axios"));
const backend_client_1 = require("./backend_client");
class Stripe {
    createPaymentIntent(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                "amount": amount
            };
            const response = yield axios_1.default.post(`/api/stripe/create-payment-intent`, request);
            const r = response.data;
            return r;
        });
    }
    static get instance() {
        return backend_client_1.BackendClient.instance.stripe;
    }
}
exports.Stripe = Stripe;
Stripe._instance = null;
//# sourceMappingURL=stripe.js.map