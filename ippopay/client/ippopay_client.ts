import Ippopay from "node-ippopay";
import { CreateOrderRequest } from "./models/create_order_request";
import { Env } from "../../env";
import { CreateOrderResponse } from "./models/create_order_response";

export class IppopayClient {
    public createOrder(createOrderRequest: CreateOrderRequest): Promise<CreateOrderResponse | any> {
        const r: Promise<any> = new Promise<any>(
            (resolve, reject) => {
                this.client.createOrder(
                    createOrderRequest, 
                    (error, data) => {
                        if (error !== null) {
                            reject(error);
                            return;
                        }

                        resolve(data);
                    }
                );
            }
        );

        return r;
    }


    private client: Ippopay = new Ippopay({
        public_key: Env.ippopayPublicKey,
        secret_key: Env.ippopaySecretKey
    });
}