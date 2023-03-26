import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
import { Env } from "../../../env";

export default async function (request: NextApiRequest, response: NextApiResponse) {    
    const requestData: RequestData = request.body;

    const client: Stripe = new Stripe(Env.stripeSecretKey, { apiVersion: "2022-11-15" });
    
    const paymentIntent: Stripe.PaymentIntent = await client.paymentIntents.create({
        amount: requestData.amount,
        currency: "inr",
        automatic_payment_methods: { enabled: true }
    });

    response.send(paymentIntent);
}

interface RequestData {
    amount: number;
}