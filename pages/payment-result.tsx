import { GetServerSideProps, NextPage } from "next";

import bodyParser from "body-parser";
import util from "util";
import axios from "axios";
import { CCAvenueFrontendClient, DecryptResponseResponse } from "../ccavenue/ccavenue_frontend_client";
import { useEffectClientSide } from "../hooks/common/use_effect_client_side";

const getBody = util.promisify(bodyParser.urlencoded());

interface PaymentResultPageProps {
    decryptedResponse: DecryptResponseResponse;
}

const PaymentResultPage: NextPage<PaymentResultPageProps> = (props) => {
    useEffectClientSide(
        () => {
            let orderStatus: string;
            if (props.decryptedResponse.order_status === "Aborted") orderStatus = "cancelled";
            else if (props.decryptedResponse.order_status === "Success") orderStatus = "success";
            else orderStatus = "Failed";

            window.localStorage.setItem("order_status", orderStatus);
            window.localStorage.setItem("order_id", props.decryptedResponse.order_id);            
        },
        []
    );

    return (
        <div className="light_theme">
            {props.decryptedResponse.order_status}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<PaymentResultPageProps> = async (context) => {
    if (context.req.method === "POST") {
        await getBody(context.req, context.res);
        const encryptedResponse: { [key: string]: any } = (context.req as any).body;

        const client: CCAvenueFrontendClient = new CCAvenueFrontendClient();
        const decryptedResponse: DecryptResponseResponse = await client.decryptResponse(encryptedResponse["encResp"]);

        return {
            props: {
                decryptedResponse: decryptedResponse
            }
        };
    }

    return { notFound: true };
};

export default PaymentResultPage;