import { Context, createContext, Dispatch, SetStateAction } from "react";
import CartItem from "../../../models/cart_item";

export interface CartController {
    readonly onOpen?: ()=>void;
    readonly onClose?: ()=>void;

    readonly onCreated: ()=>void;

    readonly isOpen: boolean;

    readonly cartItems: CartItem[];
    readonly price: number;    

    readonly isLoading: boolean;

    readonly onClickReturnToShopButton: ()=>void;
       
    readonly isPlaceOrderButtonDisabled: ()=>boolean;
    readonly onPlaceOrderButtonClicked: ()=>void;

    readonly onCloseButtonClicked: ()=>void;

    readonly onIncreaseQuantityButtonClicked: (productId: string)=>void;
    readonly onDecreaseQuantityButtonClicked: (productId: string)=>void;
}

export const CartControllerContext: Context<CartController | null> = createContext<CartController | null>(null);