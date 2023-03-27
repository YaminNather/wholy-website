import { StripeElements } from "@stripe/stripe-js";
import { createContext } from "react";

export interface StripePaymentPortalPageController {
    readonly clientSecret: string;
    readonly onPayButtonClicked: (elements: StripeElements)=>Promise<void>;
}

export const StripePaymentPortalPageControllerContext = createContext<StripePaymentPortalPageController | null>(null);