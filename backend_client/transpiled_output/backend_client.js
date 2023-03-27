"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendClient = void 0;
const stripe_1 = require("./stripe");
class BackendClient {
    constructor() {
        this.stripe = new stripe_1.Stripe();
    }
    static get instance() {
        if (this._instance === null)
            this._instance = new BackendClient();
        return this._instance;
    }
}
exports.BackendClient = BackendClient;
BackendClient._instance = null;
//# sourceMappingURL=backend_client.js.map