import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { FC, useContext } from "react";
import { StripePaymentPortalPageControllerContext, StripePaymentPortalPageController } from "./stripe_payment_portal_page_controller";

import styles from "./stripe_payment_portal_page_ui_styles.module.scss";
import { Env } from "../../env";

export const StripeCheckoutPageUI: FC = (props) => {
    const controller: StripePaymentPortalPageController = useContext(StripePaymentPortalPageControllerContext)!; 

    const stripe: Stripe = useStripe()!;
    const elements: StripeElements = useElements()!;

    return (
        <div className={styles.stripe_checkout_page}>
            <div className={styles.form}>
                <PaymentElement className={styles.payment_element} id="payment-element" options={{ layout: "tabs" }} />

                <button onClick={(event) => controller.onPayButtonClicked(elements)} className={styles.pay_button}>Pay</button>
            </div>
        </div>
    );
};