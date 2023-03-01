import { Context, createContext } from "react";
import { Checkout } from "../../models/checkout";
import { ContactInformation } from "./contact_information";
import { Address } from "./address";
import { PriceDetails } from "./price_details";
import CartItem from "../../models/cart_item";

export interface CheckoutPageController {
    readonly isLoading: boolean;
    readonly setIsLoading: (value: boolean)=>void;

    readonly checkout: Checkout;
    readonly cartItems: CartItem[] | undefined;

    readonly couponCode: string;
    readonly setCouponCode: (value: string)=>void;
    readonly onApplyCouponCodeButtonClicked: ()=>Promise<void>;

    readonly priceDetails: PriceDetails;

    readonly contactInformation: ContactInformation;
    readonly setContactInformation: (value: ContactInformation)=>void;

    readonly address: Address;
    readonly setAddress: (value: Address)=>void;

    readonly onConfirmAndPayButtonClicked: ()=>void;
    readonly isConfirmAndPayButtonDisabled: ()=>boolean;

    readonly isGoogleSignInButtonVisible: ()=>boolean;
    readonly onGoogleSignInButtonClicked: ()=>void;    
}

export const CheckoutPageControllerContext: Context<CheckoutPageController | null> = createContext<CheckoutPageController | null>(null);