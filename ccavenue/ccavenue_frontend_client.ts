import axios, { AxiosResponse } from "axios";

export class CCAvenueFrontendClient {
    public async openPortal(options: OpenPortalOptions): Promise<OpenPortalResponse | undefined> {
        const body: EncryptRequestRequest = {            
            order_id: options.orderId,
            amount: options.amount,
            domain: `${window.location.protocol}//${window.location.host}`,
            billing_details: {
                name: options.billingDetails.name,                
                address: options.billingDetails.address,                
                city: options.billingDetails.city,                
                state: options.billingDetails.state,                
                pin_code: options.billingDetails.pinCode,
                phone_number: options.billingDetails.phoneNumber,                
                email: options.billingDetails.email
            }
        };
        const encryptRequestResponse: AxiosResponse = await axios.post("/api/ccavenue/encrypt-request", body);
        if (encryptRequestResponse.status < 200 || encryptRequestResponse.status > 299) {
            return;
        }
        const encryptedRequest: string = encryptRequestResponse.data;

        const paymentPortalUrl: string = `${window.location.protocol}//${window.location.host}/payment-portal?encrypted_request=${encryptedRequest}`;
        window.open(paymentPortalUrl, "_blank")!.focus();

        return {} as OpenPortalResponse;
    }
}

export interface OpenPortalOptions {
    readonly orderId: string;
    readonly amount: number;
    readonly billingDetails: OpenPortalOptionsBillingDetails;
}

export interface OpenPortalOptionsBillingDetails {
    readonly name: string;
    readonly address: string;
    readonly city: string;
    readonly state: string;
    readonly pinCode: number;
    readonly phoneNumber: string;
    readonly email: string; 
}

interface EncryptRequestRequest {
    readonly order_id: string;
    readonly amount: number;
    readonly domain: string;
    readonly billing_details: EncryptBillingDetails;
}

interface EncryptBillingDetails {
    readonly name: string;
    readonly address: string;
    readonly city: string;
    readonly state: string;
    readonly pin_code: number;
    readonly phone_number: string;
    readonly email: string;
}

export interface OpenPortalResponse {

}