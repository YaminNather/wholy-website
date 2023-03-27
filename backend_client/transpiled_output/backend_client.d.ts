import { Stripe } from "./stripe";
export declare class BackendClient {
    private constructor();
    static get instance(): BackendClient;
    private static _instance;
    readonly stripe: Stripe;
}
//# sourceMappingURL=backend_client.d.ts.map