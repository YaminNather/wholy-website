import { NextApiRequest, NextApiResponse } from "next";
import { Env } from "../../../env";

import ccAvenueUtils from "../../../ccavenue/ccavutil.js";

export default async function(request: NextApiRequest, response: NextApiResponse) {
    let debugResponseData: string = "\nDecrypt Response Function started";
    try {        
        const encryptedResponse: string = request.body["encrypted_response"];
        const decryptedResponse: string = ccAvenueUtils.decrypt(encryptedResponse, Env.ccAvenueWorkingKey);

        const decryptedResponseObject: any = decryptedResponseToObject(decryptedResponse);

        response.send(decryptedResponseObject);
    }
    catch(e) {
        const exception: any = e;
        debugResponseData += `\n\nException\nName: ${exception.name}\nMessage: ${exception.message}\nStack: ${exception.stack}`;
        response.statusCode = 500;
        response.send(debugResponseData);
    }
}

function decryptedResponseToObject(queryString: string): any {
    const splitQueryString: string[] = queryString.split("&");

    const r: any = {};
    for (const part of splitQueryString) {
        const splitPart: string[] = part.split("=");
        r[splitPart[0]] = splitPart[1];
    }    

    return r;
}