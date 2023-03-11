import * as Ippopay from "node-ippopay";
import { CreateOrderRequest } from "./models/create_order_request";
import { Env } from "../../env";

export class IppopayClient {
    public createOrder(createOrderRequest: CreateOrderRequest): Promise<any> {
        const r: Promise<any> = new Promise<any>(
            (resolve, reject) => {
                this.client.createOrder(
                    createOrderRequest, 
                    function (err: any, data: any) {
                        console.log(data);
                        resolve(data);
                    }
                );
            }
        );

        return r;
    }


    private client: any = new Ippopay({
        public_key: Env.ippopayPublicKey,
        secret_key: Env.ippopaySecretKey
    });
}