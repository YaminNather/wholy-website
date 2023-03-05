import { NextApiRequest, NextApiResponse } from "next";
import { Env } from "../../../env";

import ccAvenueUtils from "../../../ccavenue/ccavutil.js";
import { URL } from "url";

export default async function(request: NextApiRequest, response: NextApiResponse) {
    let debugResponseData: string = "\nDecrypt Response Function started";
    try {        
        const encryptedResponse: string = request.body["encrypted_response"];
        const decryptedResponse: string = ccAvenueUtils.decrypt(encryptedResponse, Env.ccAvenueWorkingKey);

        response.send(decryptedResponse);
    }
    catch(e) {
        const exception: any = e;
        debugResponseData += `\n\nException\nName: ${exception.name}\nMessage: ${exception.message}\nStack: ${exception.stack}`;
        response.statusCode = 500;
        response.send(debugResponseData);
    }
}