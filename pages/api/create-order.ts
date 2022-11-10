import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateOrderRequest } from "../../razorpay_client/models/create_order_request";
import { CreateOrderResponse } from "../../razorpay_client/models/create_order_response";

export default async (request: NextApiRequest, response: NextApiResponse) => {    
    const bodyJson: CreateOrderRequest = {
        amount: request.body.amount,
        currency: "INR"
    };

    let axiosResponse: AxiosResponse = await axios.post(
        `https://api.razorpay.com/v1/orders`,
        bodyJson,
        {
            auth: {
                username: "rzp_test_FkTMc27tC2DyPT",
                password: "5fz16fyeLaTEW5fVSxDqHIs8"
            }
        }
    );
    
    response.statusCode = axiosResponse.status;
    response.send(axiosResponse.data);
};