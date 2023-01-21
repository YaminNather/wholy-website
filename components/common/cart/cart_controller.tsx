import { Context, createContext, Dispatch, SetStateAction } from "react";
import { Checkout } from "../../../models/checkout";
import CartItem from "../../../models/cart_item";
import { TotalPriceInfoAreaDetails } from "../../checkout_page/checkout_section/total_price_info_area/total_price_info_area";
import { Address } from "./address";

export interface CartController {
    readonly onCreated: ()=>void;

    readonly isOpen: boolean;

    readonly pulledFromDatabase: boolean;
    readonly setPulledFromDatabase: Dispatch<SetStateAction<boolean>>;
    
    readonly checkout: Checkout;
    readonly cartItems: CartItem[];    
    readonly setCartItems: Dispatch<SetStateAction<CartItem[]>>;

    readonly isLoading: boolean;
    
    readonly onApplyCouponCodeButtonClicked: ()=>void;

    readonly fullName: string;
    readonly onFullNameChanged: Dispatch<SetStateAction<string>>;
    
    readonly phone: string;
    readonly onPhoneChanged: Dispatch<SetStateAction<string>>;

    readonly email: string;
    readonly onEmailChanged: Dispatch<SetStateAction<string>>;

    readonly address: Address;
    readonly onAddressChanged: Dispatch<SetStateAction<Address>>;

    readonly couponCode: string;
    readonly onCouponCodeFieldChanged: Dispatch<SetStateAction<string>>;

    readonly totalPriceInfoAreaDetails: TotalPriceInfoAreaDetails;
    readonly setPriceInfoAreaDetails: Dispatch<SetStateAction<TotalPriceInfoAreaDetails>>;

    readonly isPlaceOrderButtonDisabled: boolean;
    readonly onPlaceOrderButtonClicked: ()=>void;

    readonly onCloseButtonClicked: ()=>void;

    readonly onIncreaseQuantityButtonClicked: (cartItem: CartItem)=>void;
    readonly onDecreaseQuantityButtonClicked: (cartItem: CartItem)=>void;
}

export const CartControllerContext: Context<CartController | null> = createContext<CartController | null>(null);