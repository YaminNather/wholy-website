import { NextApiRequest, NextApiResponse } from "next";
import { Env } from "../../../env";

import ccAvenueUtils from "../../../ccavenue/ccavutil.js";
import { URL } from "url";

export default async function(request: NextApiRequest, response: NextApiResponse) {
    let debugResponseData: string = "\nEncrypted Handler Function started";
    try {
        let encryptedRequest;        
        
        let ccAvenueRequestJson: any = {
            "merchant_id": 2125136,
            "order_id": request.body["order_id"],
            "currency": "INR",
            "amount": request.body["amount"],
            "redirect_url": `${request.body["domain"]}/api/ccavenue/response-handler`,
            "cancel_url": `${request.body["domain"]}/api/ccavenue/response-handler`,
            "language": "EN"
        };        

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