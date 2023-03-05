import axios, { AxiosResponse } from "axios";

export class CCAvenueFrontendClient {
    public async openPortal(orderId: string, amount: number): Promise<OpenPanelResponse | undefined> {
        const body: any = {            
            "order_id": orderId,
            "amount": amount,
            "domain": `${window.location.protocol}//${window.location.host}`
        };
        const encryptResponse: AxiosResponse = await axios.post("/api/ccavenue/encrypt-request", body);
        if (encryptResponse.status < 200 || encryptResponse.status > 299) {
            return;
        }
        const encryptedRequest: string = encryptResponse.data;

        const paymentPortalUrl: string = `${window.location.protocol}//${window.location.host}/payment-portal?encrypted_request=${encryptedRequest}`;
        window.open(paymentPortalUrl, "_blank")!.focus();

        return {} as OpenPanelResponse;
    }
}

export interface OpenPanelResponse {

}