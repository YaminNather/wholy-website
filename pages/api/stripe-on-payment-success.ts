import { NextApiRequest, NextApiResponse } from "next";

import { Stripe } from "stripe";
import { initializeApp } from "firebase-admin/app";

import { Env } from "../../env";
import { buffer } from "micro";

export const config = {
    "api": {
        "bodyParser": false
    }
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const client: Stripe = new Stripe(Env.stripeSecretKey, { apiVersion: "2022-11-15" });
    const signature: string = request.headers['stripe-signature'] as string;

    const rawBody = await buffer(request);
    const body = JSON.parse(rawBody.toString());
    console.log("Yay, we got the body back", {body})

    let event;
    try {
        event = client.webhooks.constructEvent(rawBody, signature, Env.stripeWebhookSigningSecretKey);
    }
    catch (error: any) {
        response.status(400);
        response.send(`Webhook error: ${error.message}`);
        return;
    }
    
    if (event.type === "payment_intent.succeeded") {
        console.log(`CustomLog: Stripe payment_intent.succeeded Webhook Event received:\n${JSON.stringify(event.data.object, null, 2)}`);

        updatePaymentStatusInFirebase();
    }
    else {
        response.status(400);
        response.send(`Webhook received wrong event type ${event.object}, this webhook only handles payment_intent.succeeded`);
    }    
};

async function updatePaymentStatusInFirebase(): Promise<void> {

}