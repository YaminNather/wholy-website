import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateOrderRequest } from "../../razorpay_client/models/create_order_request";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    let axiosResponse: AxiosResponse = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        request.body
    );
    
    response.statusCode = axiosResponse.status;
    response.send(axiosResponse.data);
};