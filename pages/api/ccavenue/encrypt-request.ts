import { NextApiRequest, NextApiResponse } from "next";
import { Env } from "../../../env";

import ccAvenueUtils from "../../../ccavenue/ccavutil.js";
import { URL } from "url";

export default async function(request: NextApiRequest, response: NextApiResponse) {
    let debugResponseData: string = "\nEncrypted Handler Function started";
    try {
        let encryptedRequest;        

        // let ccAvenueRequestJson: any = {
        //     merchant_id: '2125136',
        //     order_id: 'order_id_0',
        //     currency: 'INR',
        //     amount: '5000',
        //     redirect_url: 'https://www.eatwholy.com/api/ccavenue/response-handler',
        //     cancel_url: 'https://www.eatwholy.com/api/ccavenue/response-handler',
        //     language: 'EN',
        //     integration_type: 'iframe_normal',
        //     billing_name: 'Peter',
        //     billing_address: 'Santacruz',
        //     billing_city: 'Mumbai',
        //     billing_state: 'MH',
        //     billing_zip: '400054',
        //     billing_country: 'India',
        //     billing_tel: '9876543210',
        //     billing_email: 'testing@domain.com',
        //     delivery_name: '',
        //     delivery_address: '',
        //     delivery_city: '',
        //     delivery_state: '',
        //     delivery_zip: '',
        //     delivery_country: '',
        //     delivery_tel: '',
        //     merchant_param1: '',
        //     merchant_param2: '',
        //     merchant_param3: '',
        //     merchant_param4: '',
        //     merchant_param5: '',
        //     promo_code: '',
        //     customer_identifier: ''
        // };
        
        let ccAvenueRequestJson: any;
        const requestBillingDetails: any = request.body["billing_details"];
        ccAvenueRequestJson = {
            "merchant_id": "2125136",
            "order_id": request.body["order_id"],
            "currency": "INR",
            "amount": request.body["amount"].toString(),
            "redirect_url": `${request.body["domain"]}/api/ccavenue/response-handler`,
            "cancel_url": `${request.body["domain"]}/api/ccavenue/response-handler`,
            "integration_type": "iframe_normal",
            "language": "EN",
            "billing_name": requestBillingDetails["name"],
            "billing_address": requestBillingDetails["address"],
            "billing_city": requestBillingDetails["city"],
            "billing_state": requestBillingDetails["state"],
            "billing_zip": requestBillingDetails["pin_code"],
            "billing_country": 'India',
            "billing_tel": requestBillingDetails["phone_number"],
            "billing_email": requestBillingDetails["email"],
            delivery_name: '',
            delivery_address: '',
            delivery_city: '',
            delivery_state: '',
            delivery_zip: '',
            delivery_country: '',
            delivery_tel: '',
            merchant_param1: '',
            merchant_param2: '',
            merchant_param3: '',
            merchant_param4: '',
            merchant_param5: '',
            promo_code: '',
            customer_identifier: ''
        };
        // ccAvenueRequestJson = request.body;
        
        console.log(ccAvenueRequestJson);

        let parametersInQueryForm = "";
        for (const key of Object.keys(ccAvenueRequestJson)) {
            parametersInQueryForm += `${key}=${ccAvenueRequestJson[key]}&`;
        }
        debugResponseData += `\nParameters in Query Form: ${parametersInQueryForm}`;
        
        encryptedRequest = ccAvenueUtils.encrypt(parametersInQueryForm, Env.ccAvenueWorkingKey);

        response.send(encryptedRequest);
    }
    catch(e) {
        const exception: any = e;
        debugResponseData += `\n\nException\nName: ${exception.name}\nMessage: ${exception.message}\nStack: ${exception.stack}`;
        response.statusCode = 500;
        response.send(debugResponseData);
    }
}