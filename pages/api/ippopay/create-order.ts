import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { IppopayClient } from "../../../ippopay/client/ippopay_client";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const client: IppopayClient = new IppopayClient();
    const r: any = await client.createOrder(request.body);

    response.statusCode = 202;
    response.send(r);
};