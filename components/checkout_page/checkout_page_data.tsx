import { Context, createContext, Dispatch, SetStateAction } from "react";
import CartBridge from "../../models/cart_bridge";
import CartItem from "../../models/cart_item";
import { Checkout } from "../../models/checkout";

export interface CheckoutPageData {
    checkout: Checkout;
    cartItems: CartItem[];
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    onApplyCouponCodeButtonClicked: ()=>void;
}

export const checkoutPageDataContext: Context<CheckoutPageData | null> = createContext<CheckoutPageData | null>(null);