declare module "node-ippopay" {
    type CreateOrderResponse = import("./models/create_order_response").CreateOrderResponse;

    declare class Ippopay {        
        public constructor(options: {public_key: string, secret_key: string});

        public createOrder(createOrderRequest: CreateOrderRequest, handler: (err: any | null, data: CreateOrderResponse | undefined)=>void): void;
    }

    export = Ippopay;
}