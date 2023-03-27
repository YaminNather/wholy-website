import { PaymentIntent } from "@stripe/stripe-js";
export declare class Stripe {
    createPaymentIntent(amount: number): Promise<PaymentIntent>;
    static get instance(): Stripe;
    static _instance: Stripe | null;
}
//# sourceMappingURL=stripe.d.ts.map