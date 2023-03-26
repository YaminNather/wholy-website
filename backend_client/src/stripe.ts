import { PaymentIntent } from "@stripe/stripe-js";
import axios, { AxiosResponse } from "axios";
import { BackendClient } from "./backend_client";

export class Stripe {
    public async createPaymentIntent(amount: number): Promise<PaymentIntent> {
        const request = {
            "amount": amount
        };
        const response: AxiosResponse = await axios.post(`/api/stripe/create-payment-intent`, request);

        const r: PaymentIntent = response.data;
        
        return r;
    }

    public static get instance(): Stripe {
        return BackendClient.instance.stripe;
    }



    public static _instance: Stripe | null = null;
}