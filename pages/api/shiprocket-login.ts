import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Env } from "../../env";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    let body: any = {
        "email": Env.shiprocketEmail,
        "password": Env.shiprocketPassword
    };

    let axiosResponse: AxiosResponse = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        body
    );
    
    response.statusCode = axiosResponse.status;
    response.send(axiosResponse.data);
};