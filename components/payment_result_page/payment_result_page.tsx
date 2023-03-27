import { NextRouter, useRouter } from "next/router";
import { FC, useContext, useRef } from "react";
import { useEffectClientSide } from "../../hooks/common/use_effect_client_side";
import { PaymentIntent, PaymentIntentResult, Stripe, loadStripe } from "@stripe/stripe-js";
import { IPaymentService, PaymentStatus } from "../../services/i_payment_service";
import { StripePaymentService } from "../../services/stripe_payment_service";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import { Env } from "../../env";

function stripePaymentStatusToPaymentStatus(stripePaymentStatus: PaymentIntent.Status): PaymentStatus {
    if (stripePaymentStatus === "succeeded") return PaymentStatus.succeeded;

    if (stripePaymentStatus === "canceled") return PaymentStatus.cancelled;

    throw new Error(`Cannot convert ${stripePaymentStatus} to PaymentStatus enum`);
}

export const PaymentResultPage: FC = (props) => {
    const loadingIndicatorController: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;
    const router: NextRouter = useRouter();    

    useEffectClientSide(
        () => {
            async function asyncPart(): Promise<void> {
                loadingIndicatorController.setIsLoading(true);                
                
                const stripeClient: Stripe = (await loadStripe(Env.stripePublishableKey))!;

                const clientSecret: string = router.query["payment_intent_client_secret"] as string
                const paymentIntentResult: PaymentIntentResult = await stripeClient.retrievePaymentIntent(clientSecret);
                
                const stripePaymentService: IPaymentService = new StripePaymentService();
                
                const stripePaymentStatus: PaymentIntent.Status = paymentIntentResult.paymentIntent!.status;
                const paymentStatus: PaymentStatus = stripePaymentStatusToPaymentStatus(stripePaymentStatus);
                stripePaymentService.broadcastPaymentStatus(paymentStatus);
                
                loadingIndicatorController.setIsLoading(false);
                window.close();
            }

            asyncPart();
        },
        []
    );    

    return (
        <></>
    );
};