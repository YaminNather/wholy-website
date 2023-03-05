import { NextApiRequest, NextApiResponse } from "next";
import * as querystring from "querystring";
import { ParsedUrlQuery } from "querystring";
import { Env } from "../../../env";

import ccAvenueUtils from "../../../ccavenue/ccavutil.js";

export default async function(request: NextApiRequest, response: NextApiResponse) {
    let debugResponseData: string = "\nRequest Handler Function started";
    debugResponseData += `\n\nWorking key: ${Env.ccAvenueWorkingKey}`;
    debugResponseData += `\nAccess Code: ${Env.ccAvenueAccessCode}`;
    try {
        const body: string = JSON.stringify(request.body, null, 2);
        const workingKey: string = Env.ccAvenueWorkingKey;
        let encryptRequest;
        try {
            encryptRequest = ccAvenueUtils.encrypt(body, Env.ccAvenueWorkingKey);
        }
        catch(e) {
            const exception: any = e;
            debugResponseData += `\nName: ${exception.name}\nMessage: ${exception.message}\nStack: ${exception.stack}`
            response.send(debugResponseData);
            return;
        }
        debugResponseData += "\nDone encrypting";
        // const post: ParsedUrlQuery = querystring.parse(body);
        // debugResponseData += "\nDone Parsing queries";
        // debugResponseData += `\nPost Data:\n${JSON.stringify(post, null, 2)}`;

        const formBody: string = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='+request.body.merchant_id+'&encRequest='+encryptRequest+'&access_code='+Env.ccAvenueAccessCode+'"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';    
        debugResponseData += "\nDone initializing formBody";
        debugResponseData += `\nForm body: ${formBody}`;

        const responseHeaders: { [key: string]: string } = {
            "Content-Type": "text/html"
        };
        response.setHeader("Content-Type", "text/html");
        response.send(formBody);

        // response.send(`Debug response data:\n${debugResponseData}`);
    }
    catch(e) {
        const exception: any = e;
        debugResponseData += `\n\nException\nName: ${exception.name}\nMessage: ${exception.message}\nStack: ${exception.stack}`;
        response.send(debugResponseData);
    }
}