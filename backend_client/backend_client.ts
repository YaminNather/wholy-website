import axios, { AxiosResponse } from "axios";
import { CreateOrderOptions } from "./models/create_order_options";

export class BackendClient {
    public async createOrder(options: CreateOrderOptions): Promise<any> {
        const response: AxiosResponse = await axios.post("/api/ippopay/create-order", options);

        return response.data;
    }
}