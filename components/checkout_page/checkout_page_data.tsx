import { Context, createContext, Dispatch, SetStateAction } from "react";
import CartBridge from "../../models/cart_bridge";
import CartItem from "../../models/cart_item";

export interface CheckoutPageData {
    cart: CartBridge;
    cartItems: CartItem[];
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

export const checkoutPageDataContext: Context<CheckoutPageData | null> = createContext<CheckoutPageData | null>(null);