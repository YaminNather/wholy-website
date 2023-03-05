import { NextApiRequest, NextApiResponse } from "next";
import { Env } from "../../../env";

import ccAvenueUtils from "../../../ccavenue/ccavutil.js";
import { URL } from "url";

export default async function(request: NextApiRequest, response: NextApiResponse) {
    let debugResponseData: string = "\nRequest Handler Function started";
    debugResponseData += `\n\nWorking key: ${Env.ccAvenueWorkingKey}`;
    debugResponseData += `\nAccess Code: ${Env.ccAvenueAccessCode}`;
    try {
        const workingKey: string = Env.ccAvenueWorkingKey;
        let encryptedRequest;
        try {
            let parametersInQueryForm = "";
            for (const key of Object.keys(request.body)) {
                parametersInQueryForm += `${key}=${request.body[key]}&`;
            }
            debugResponseData += `\nParameters in Query Form: ${parametersInQueryForm}`;
            encryptedRequest = ccAvenueUtils.encrypt(parametersInQueryForm, Env.ccAvenueWorkingKey);
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

        const iframeUrl: URL = new URL("/transaction/transaction.do", "https://secure.ccavenue.com");
        //command=initiateTransaction&merchant_id='+request.body.merchant_id+'&encRequest='+encryptRequest+'&access_code='+Env.ccAvenueAccessCode
        iframeUrl.searchParams.append("command", "initiateTransaction");
        iframeUrl.searchParams.append("merchant_id", request.body.merchant_id);
        iframeUrl.searchParams.append("encRequest", encryptedRequest);
        iframeUrl.searchParams.append("access_code", Env.ccAvenueAccessCode);

        debugResponseData += `\niFrame URL = ${iframeUrl}`;

        const formBody: string = '<html><head><title>Sub-merchant checkout page</title><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="' + iframeUrl.href +'"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';    
        debugResponseData += "\nDone initializing formBody";
        debugResponseData += `\nForm body: ${formBody}`;

        // const responseHeaders: { [key: string]: string } = {
        //     "Content-Type": "text/html"
        // };
        // response.setHeader("Content-Type", "text/html");
        // response.send(formBody);

        response.send(`Debug response data:\n${debugResponseData}`);
    }
    catch(e) {
        const exception: any = e;
        debugResponseData += `\n\nException\nName: ${exception.name}\nMessage: ${exception.message}\nStack: ${exception.stack}`;
        response.send(debugResponseData);
    }
}