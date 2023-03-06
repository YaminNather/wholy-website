import axios, { AxiosResponse } from "axios";

export class CCAvenueFrontendClient {
    public openPortal(options: OpenPortalOptions): Promise<boolean | undefined> {
        const promise = new Promise<boolean | undefined>(
            (resolve, reject) => {
                const setupPortal = async (): Promise<void> => {
                    const request: EncryptRequestRequest = {            
                        order_id: options.orderId,
                        amount: options.amount,
                        domain: `${window.location.protocol}//${window.location.host}`,
                        // domain: `http://localhost:3000`,
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
                    
                    const encryptedRequest: string = await this.encodeRequest(request);
            
                    const paymentPortalUrl: string = `${window.location.protocol}//${window.location.host}/payment-portal?encrypted_request=${encryptedRequest}`;
                    window.open(paymentPortalUrl, "_blank")!.focus();
                }
        
                setupPortal().then(
                    () => {
                        const storageListener = (event: StorageEvent) => {
                            if (event.storageArea!.getItem("ccavenue_order_status") === null) return;

                            alert("Order status received");
                            const orderStatus: string = event.storageArea!.getItem("ccavenue_order_status")!;
                            if (orderStatus === "success") {
                                resolve(true);
                            }
                            else if (orderStatus === "cancelled") {
                                resolve(undefined);
                            }
                            else {
                                reject(new Error("CCAvenue payment failed"));
                            }
                            
                            window.localStorage.removeItem("ccavenue_order_status");
                            window.removeEventListener("storage", storageListener);
                        };

                        window.addEventListener("storage", storageListener);
                    }
                );
            }
        );

        return promise;
    }

    private async encodeRequest(request: EncryptRequestRequest): Promise<string> {
        const encryptRequestResponse: AxiosResponse = await axios.post("/api/ccavenue/encrypt-request", request);
        if (encryptRequestResponse.status < 200 || encryptRequestResponse.status > 299) {
            throw new Error(`Encryption failed with status code ${encryptRequestResponse.statusText}`);
        }
        const encryptedRequest: string = encryptRequestResponse.data;
        return encryptedRequest;
    }

    public async decryptResponse(response: string): Promise<any> {
        // const decryptResponseReponse: AxiosResponse = await axios.post("/api/ccavenue/decrypt-response", response);
        const decryptResponseReponse: AxiosResponse = await axios.post("/api/ccavenue/decrypt-response", { "encrypted_response": response });
        if (decryptResponseReponse.status < 200 || decryptResponseReponse.status > 299) {
            throw new Error(`Decryption failed with status code ${decryptResponseReponse.statusText}`);
        }

        return decryptResponseReponse.data;
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


export interface DecryptResponseResponse {
    order_id:         string;
    tracking_id:      string;
    bank_ref_no:      string;
    order_status:     string;
    failure_message:  string;
    payment_mode:     string;
    card_name:        string;
    status_code:      string;
    status_message:   string;
    currency:         string;
    amount:           string;
    billing_name:     string;
    billing_address:  string;
    billing_city:     string;
    billing_state:    string;
    billing_zip:      string;
    billing_country:  string;
    billing_tel:      string;
    billing_email:    string;
    delivery_name:    string;
    delivery_address: string;
    delivery_city:    string;
    delivery_state:   string;
    delivery_zip:     string;
    delivery_country: string;
    delivery_tel:     string;
    merchant_param1:  string;
    merchant_param2:  string;
    merchant_param3:  string;
    merchant_param4:  string;
    merchant_param5:  string;
    vault:            string;
    offer_type:       string;
    offer_code:       string;
    discount_value:   string;
    mer_amount:       string;
    eci_value:        string;
    retry:            string;
    response_code:    string;
    billing_notes:    string;
    trans_date:       string;
    bin_country:      string;
}


export interface OpenPortalResponse {

}