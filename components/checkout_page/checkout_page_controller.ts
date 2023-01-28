import { Context, createContext } from "react";
import { Checkout } from "../../models/checkout";
import { ContactInformation } from "./contact_information";
import { Address } from "./address";
import { PriceDetails } from "./price_details";
import CartItem from "../../models/cart_item";

export interface CheckoutPageController {
    isLoading: boolean;
    setIsLoading: (value: boolean)=>void;
    
    checkout: Checkout;
    cartItems: CartItem[] | undefined;

    couponCode: string;
    setCouponCode: (value: string)=>void;
    onApplyCouponCodeButtonClicked: ()=>Promise<void>;

    priceDetails: PriceDetails;
    
    contactInformation: ContactInformation;
    setContactInformation: (value: ContactInformation)=>void;
    
    address: Address;
    setAddress: (value: Address)=>void;

    onConfirmAndPayButtonClicked: ()=>void;
    isConfirmAndPayButtonDisabled: ()=>boolean;
}

export const CheckoutPageControllerContext: Context<CheckoutPageController | null> = createContext<CheckoutPageController | null>(null);