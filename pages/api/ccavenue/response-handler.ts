import { NextApiRequest, NextApiResponse } from "next";
import * as querystring from "querystring";
import { ParsedUrlQuery } from "querystring";
import { Env } from "../../../env";

import ccAvenueUtils from "../../../ccavenue/ccavutil.js";

export default async function(request: NextApiRequest, response: NextApiResponse) {
    
    const post: ParsedUrlQuery = querystring.parse(request.body);

    const encryption: string = post["encResp"] as string;

    const decryptResponse = ccAvenueUtils.decrypt(encryption, Env.ccAvenueWorkingKey);

    let pData: string = '';
    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>';
    pData = pData + decryptResponse.replace(/=/gi,'</td><td>');
    pData = pData.replace(/&/gi,'</td></tr><tr><td>');
    pData = pData + '</td></tr></table>';
    
    const htmlCode: string = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>'+ pData +'</center><br></body></html>';

    response.setHeader("Content-Type", "text/html");
    response.send(htmlCode);
}