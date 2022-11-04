import { Context, createContext } from "react";
import CartBridge from "../../models/cart_bridge";
import CartItem from "../../models/cart_item";

export interface CheckoutPageData {
    cart: CartBridge;
    cartItems: CartItem[];    
}

export const checkoutPageDataContext: Context<CheckoutPageData | null> = createContext<CheckoutPageData | null>(null);