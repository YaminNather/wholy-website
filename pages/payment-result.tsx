import { GetServerSideProps, NextPage } from "next";

import bodyParser from "body-parser";
import util from "util";
import axios from "axios";
import { CCAvenueFrontendClient } from "../ccavenue/ccavenue_frontend_client";

const getBody = util.promisify(bodyParser.urlencoded());

interface PaymentResultPageProps {
    decryptedResponse: any;
}

const PaymentResultPage: NextPage<PaymentResultPageProps> = (props) => {
    
    
    return (
        <>
            {JSON.stringify(props.decryptedResponse, null, 2)}    
        </>
    );
};

export const getServerSideProps: GetServerSideProps<PaymentResultPageProps> = async (context) => {
    if (context.req.method === "POST") {
        await getBody(context.req, context.res);
        const encryptedResponse: { [key: string]: any } = (context.req as any).body;

        const client: CCAvenueFrontendClient = new CCAvenueFrontendClient();
        const decryptedResponse: any = await client.decryptResponse(encryptedResponse["encResp"]);

        return {
            props: {
                decryptedResponse: decryptedResponse
            }
        };
    }

    return { notFound: true };
};

export default PaymentResultPage;