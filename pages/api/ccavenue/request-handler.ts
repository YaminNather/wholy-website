import { NextApiRequest, NextApiResponse } from "next";
import * as querystring from "querystring";
import { ParsedUrlQuery } from "querystring";
import { Env } from "../../../env";

import ccAvenueUtils from "../../../ccavenue/ccavutil.js";

export default async function(request: NextApiRequest, response: NextApiResponse) {
    try {
        const body: string = JSON.stringify(request.body, null, 2); 
        const workingKey: string = Env.ccAvenueWorkingKey;
        const encryptRequest = ccAvenueUtils.encrypt(JSON.stringify(body, null, 2), Env.ccAvenueWorkingKey);
        const post: ParsedUrlQuery = querystring.parse(body);

        const formBody: string = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='+post.merchant_id+'&encRequest='+encryptRequest+'&access_code='+Env.ccAvenueAccessCode+'"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';

        const responseHeaders: { [key: string]: string } = {
            "Content-Type": "text/html"
        };
        response.setHeader("Content-Type", "text/html");
        response.send(formBody);
    }
    catch(exception) {
        if (exception instanceof TypeError) {
            response.send(`Exception\n\tName:${exception.name}\n\tMessage:${exception.message}\n\tStack:${exception.stack}`);
            return;
        }

        response.send(exception);
    }
}