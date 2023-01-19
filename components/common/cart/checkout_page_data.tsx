import { Context, createContext, Dispatch, SetStateAction } from "react";
import { Checkout } from "../../../models/checkout";
import CartItem from "../../../models/cart_item";

export interface CartPageData {
    checkout: Checkout;
    cartItems: CartItem[];
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    onApplyCouponCodeButtonClicked: ()=>void;
}

export const cartPageDataContext: Context<CartPageData | null> = createContext<CartPageData | null>(null);