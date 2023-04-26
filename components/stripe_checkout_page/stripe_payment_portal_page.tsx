import { FC, useCallback, useContext, useEffect, useState } from "react";
import { StripeCheckoutPageUI } from "./stripe_payment_portal_page_ui";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentIntentResult, Stripe, StripeElements, loadStripe } from "@stripe/stripe-js";
import { NextRouter, useRouter } from "next/router";
import { Env } from "../../env";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import { StripePaymentPortalPageControllerContext, StripePaymentPortalPageController } from "./stripe_payment_portal_page_controller";
import { IPaymentService, PaymentStatus } from "../../services/i_payment_service";
import { StripePaymentService } from "../../services/stripe_payment_service";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

export const StripePaymentPortalPage: FC = (props) => {
    const loadingIndicatorController: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;
    const router: NextRouter = useRouter();
    
    const [stripe, setStripe] = useState<Stripe | null>(null);

    const onPayButtonClicked = useCallback(
        async (elements: StripeElements): Promise<void> => {
            loadingIndicatorController.setIsLoading(true);

            await elements.submit();

            const clientSecret: string = router.query["client_secret"] as string;

            const confirmPaymentResult: PaymentIntentResult = await stripe!.confirmPayment({ 
                clientSecret: clientSecret, 
                elements: elements,
                // confirmParams: { return_url: `${Env.url}/payment-result` }
                redirect: "if_required",
                confirmParams: { return_url: `${Env.url}/payment-result` }
            });

            const documentId: string = clientSecret as string;
            let dataToUpdate: any = { };

            if (confirmPaymentResult.error !== undefined) {
                console.log(`CustomLog: ConfirmPaymentResult error =\n${confirmPaymentResult.error}`);                                
                dataToUpdate = { "status": "failed" };
            }
            else {
                console.log(`CustomLog: ConfirmPayment success`);
                dataToUpdate = { "status": "success" };
            }
            
            await updateDoc(doc(getFirestore(), "payments", documentId), dataToUpdate);
            
            window.close();

            loadingIndicatorController.setIsLoading(false);
        },
        [stripe, loadingIndicatorController]
    );

    useEffect(
        () => {
            async function asyncPart(): Promise<void> {
                loadingIndicatorController.setIsLoading(true);

                const stripe: Stripe = (await loadStripe(Env.stripePublishableKey))!;
                setStripe(stripe);

                loadingIndicatorController.setIsLoading(false);
            }

            asyncPart();
        },
        []
    );

    if (stripe === null) return <></>;

    const clientSecret: string = router.query["client_secret"] as string;

    const controller: StripePaymentPortalPageController = {
        clientSecret: clientSecret,
        onPayButtonClicked: onPayButtonClicked
    };

    return (
        <Elements stripe={stripe} options={{ clientSecret: clientSecret }}>
            <StripePaymentPortalPageControllerContext.Provider value={controller}>
                <StripeCheckoutPageUI />
            </StripePaymentPortalPageControllerContext.Provider>
        </Elements>
    );
};