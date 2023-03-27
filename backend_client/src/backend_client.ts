import { Stripe } from "./stripe";

export class BackendClient {
    private constructor() {}

    public static get instance(): BackendClient {
        if (this._instance === null) this._instance = new BackendClient();

        return this._instance;
    }


    private static _instance: BackendClient | null = null;
    public readonly stripe: Stripe = new Stripe();
}