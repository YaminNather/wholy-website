import { NextPage } from "next"
import { NextRouter, useRouter } from "next/router";
import { Env } from "../env";
import { useEffectClientSide } from "../hooks/common/use_effect_client_side";
import { CCAvenueFrontendClient } from "../ccavenue/ccavenue_frontend_client";

const PaymentPortalPage: NextPage = (props) => {    
    const router: NextRouter = useRouter();
    const encryptedRequest: string = router.query["encrypted_request"] as string;

    const iframeUrl: URL = new URL("/transaction/transaction.do", "https://secure.ccavenue.com");
    //command=initiateTransaction&merchant_id='+request.body.merchant_id+'&encRequest='+encryptRequest+'&access_code='+Env.ccAvenueAccessCode
    iframeUrl.searchParams.append("command", "initiateTransaction");
    iframeUrl.searchParams.append("merchant_id", "2125136");
    iframeUrl.searchParams.append("encRequest", encryptedRequest);
    iframeUrl.searchParams.append("access_code", Env.ccAvenueAccessCode);

    useEffectClientSide(
        () => {
            const listener = (event: any): void => {
                const client: CCAvenueFrontendClient = new CCAvenueFrontendClient();
                client.sendPaymentStatus("cancelled");
            };

            window.addEventListener("beforeunload", listener);

            return () => window.removeEventListener("beforeunload", listener);
        }
    );

    return (
        <>
            <iframe 
                id="paymentFrame"
                width="482" height="500" 
                scrolling="No" frameBorder="0" 
                onLoad={(event) => {
                    window.addEventListener(
                        "message",
                        function (messageEvent) {                            
                            this.window.document.getElementById("paymentFrame")!.style.height = `${messageEvent.data["newHeight"]}px`;
                        }
                    );
                }}
                src={iframeUrl.href}
            />
        </>
    );
};

export default PaymentPortalPage;