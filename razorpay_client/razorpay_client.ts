import { AxiosResponse } from "axios";
import { CreateOrderResponse } from "./models/create_order_response";
import Axios from "axios";

export class RazorpayClient {
    public async createOrder(amount: number): Promise<CreateOrderResponse> {
        const bodyJson: any = {
            amount: amount
        };     

        let response: AxiosResponse;
        try {
            response = await Axios.post(`/api/create-order`, bodyJson);
        }
        catch(e) {
            console.error(e);
            throw e;
        }

        const r: CreateOrderResponse = await response.data;
        return r;
    }
    
    public openPanel(options: OpenPanelOptions): Promise<OpenPanelResponse | undefined> {
        const promise: Promise<OpenPanelResponse> = new Promise(
            (resolve, reject) => {
                let razorpayPanelOptions: any = {
                    key: "rzp_test_FkTMc27tC2DyPT",
                    amount: options.amount,
                    name: "Wholy",
                    description: "Test Transaction",
                    order_id: options.orderId,
                    prefill: {
                        name: options.prefill?.name,
                        email: options.prefill?.email,
                        contact: options.prefill?.contact
                    },
                    handler: (response: any): void => {
                        alert(JSON.stringify(response, null, 2));
                        resolve(
                            {
                                paymentId: response.razorpay_payment_id,
                                orderId: response.razorpay_order_id,
                                signature: response.razorpay_signature
                            }
                        );
                    },
                };
                let razorpayPanel: any = new (window as any).Razorpay(razorpayPanelOptions);
                
                razorpayPanel.open();
            }
        );

        
        return promise;
    }


    private static url: string = "https://api.razorpay.com";


    private static authorizationHeader: string = `Basic ${btoa("rzp_test_FkTMc27tC2DyPT")}:${btoa("5fz16fyeLaTEW5fVSxDqHIs8")}`;
}

export interface OpenPanelOptions {
    orderId: string;
    amount: number;
    prefill?: PrefillOptions;
}

export interface PrefillOptions {
    name?: string;
    email?: string;
    contact?: string;
}

export interface OpenPanelResponse {
    orderId: string;
    paymentId: string;
    signature: string;
}