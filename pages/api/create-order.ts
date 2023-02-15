import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateOrderRequest } from "../../razorpay_client/models/create_order_request";
import { Env } from "../../env";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    console.log(
        `
            CustomLog: Create order executed with environment variables:
            \n\tRazorpay API Key: ${Env.razorpayApiKey}
            \n\tRazorpay Secret: ${Env.razorpaySecret}
        `
    );

    response.statusCode = 200;
    const responseBody: { [key: string]: string } = {
        apiKey: Env.razorpayApiKey,
        secret: Env.razorpaySecret
    };
    response.send(responseBody);
    return;

    const bodyJson: CreateOrderRequest = {
        amount: request.body.amount,
        currency: "INR"
    };

    let axiosResponse: AxiosResponse = await axios.post(
        `https://api.razorpay.com/v1/orders`,
        bodyJson,
        {
            auth: {
                username: Env.razorpayApiKey,
                password: Env.razorpaySecret
            }
        }
    );
    
    response.statusCode = axiosResponse.status;
    response.send(axiosResponse.data);
};