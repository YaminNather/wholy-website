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

export const StripePaymentPortalPage: FC = (props) => {
    const loadingIndicatorController: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;
    const router: NextRouter = useRouter();
    
    const [stripe, setStripe] = useState<Stripe | null>(null);

    const onPayButtonClicked = useCallback(
        async (elements: StripeElements): Promise<void> => {
            loadingIndicatorController.setIsLoading(true);

            await elements.submit();

            const confirmPaymentResult: PaymentIntentResult = await stripe!.confirmPayment({ 
                clientSecret: clientSecret, 
                elements: elements,
                confirmParams: { return_url: `${Env.url}/payment-result` }
            });

            if (confirmPaymentResult.error !== null && confirmPaymentResult !== undefined) {
                console.log(`ConfirmPaymentResult error =\n${confirmPaymentResult.error}`);
                
                const paymentService: IPaymentService = new StripePaymentService();
                paymentService.broadcastPaymentStatus(PaymentStatus.failed);

                window.close();
            }

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