import axios, { AxiosResponse } from "axios";

export class CCAvenueFrontendClient {
    public async openPortal(orderId: string, amount: number): Promise<void> {
        const body: any = {            
            "order_id": orderId,
            "amount": amount
        };
        const axiosResponse: AxiosResponse = await axios.post("/api/ccavenue/request-handler", body);
        if (axiosResponse.status < 200 || axiosResponse.status > 299) {
            return;
        }

        // window.open(encryptedRequest);
    }
}