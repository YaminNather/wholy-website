import { NextApiRequest, NextApiResponse } from "next";
import { ShipRocketClient } from "../../shiprocket/shiprocket_client";
import { TrackOrderResponse } from "../../shiprocket/models/track_order_response";
import { LoginResponse } from "../../shiprocket/models/login_response";
import axios, { AxiosResponse } from "axios";
import { Env } from "../../env";

export default async (request: NextApiRequest, response: NextApiResponse<TrackOrderResponse>) => {
    const orderId: string = request.query["order_id"] as string;
    const channelId: string | undefined = request.query["channel_id"] as string | undefined;

    const loginResponse: LoginResponse = await login();
        
    const url: URL = new URL("/v1/external/courier/track", "https://apiv2.shiprocket.in");
    url.searchParams.append("order_id", orderId);
    
    const headers: any = {
        "Authorization": `Bearer ${loginResponse.token}`
    };
    const shiprocketResponse: AxiosResponse = await axios.get(url.toString(), { headers: headers });            

    response.status(shiprocketResponse.status);
    response.send(shiprocketResponse.data);
}

async function login(): Promise<LoginResponse> {
    let body: any = {
        "email": Env.shiprocketEmail,
        "password": Env.shiprocketPassword
    };

    let axiosResponse: AxiosResponse = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        body
    );
    
    return axiosResponse.data;
}