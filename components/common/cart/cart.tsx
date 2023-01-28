import { NextRouter, useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import CartItem from "../../../models/cart_item";
import FirebaseCartBridge from "../../../models/firebase_cart_bridge";
import { CartController, CartControllerContext } from "./cart_controller";
import CartBridge from "../../../models/cart_bridge";
import {  getAuth } from "firebase/auth";
import { CartUI } from "./cart_ui";
import { GlobalCartController, GlobalCartControllerContext } from "./global_cart_controller";

export interface CartProps {
    isOpen: boolean;
    onCloseButtonClicked?: ()=>void;
    onOpen?: ()=>void;
    onClose?: ()=>void;
}

export const Cart: FC<CartProps> = (props) => {
    const globalCartController: GlobalCartController = useContext(GlobalCartControllerContext)!;

    const router: NextRouter = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [price, setPrice] = useState<number>(0.0);

    const cart: CartBridge = useMemo(() => new FirebaseCartBridge(), []);

    const updateStateFromCart = useCallback(
        ():void => {
            setCartItems(Object.values(cart.cartItems!));
            setPrice(cart.price);
        },
        [setCartItems]
    );

    const initialize = useCallback(
        async () => {
            if(typeof(window) === "undefined" || getAuth().currentUser === null) return;
            
            setIsLoading(true);
            
            cart.setOnChangeListener(updateStateFromCart);
            await cart.pullDatabaseInfo();

            // if(router.query["from"] === "authentication" && router.query["action"] === "buy-now") {
            //     const productId: string = router.query["product"] as string;
            //     await cart.addProduct(productId, 1);
            // }


            setIsLoading(false);            
        },
        [router, cart, updateStateFromCart]
    );

    const onPlaceOrderButtonClicked = useCallback(
        (): void => {
            router.push("/checkout");
            globalCartController.setIsOpen(false);
        },
        []
    );

    const isPlaceOrderButtonDisabled = useCallback(
        (): boolean => cartItems.length === 0,
        [cartItems]
    ); 
    
    const onCloseButtonClicked = useCallback(
        (): void => {
            props.onCloseButtonClicked?.();
        },
        [props.onCloseButtonClicked]
    );

    const onDecreaseQuantityButtonClicked = useCallback(
        async (productId: string): Promise<void> => {
            setIsLoading(true);
            
            await cart.removeProduct(productId, 1);
            
            setIsLoading(false);
        },
        []
    );
        
        const onIncreaseQuantityButtonClicked = useCallback(
            async (productId: string): Promise<void> => {
            setIsLoading(true);
            
            await cart.addProduct(productId, 1);

            setIsLoading(false);
        },
        []
    );

    useEffect(
        (): void => {
            async function asyncPart(): Promise<void> {
                setIsLoading(true);
                
                await cart.pullDatabaseInfo();
                
                setIsLoading(false);
            }

            asyncPart();
        },
        [props.isOpen]
    );

    const controller: CartController = {
        onOpen: props.onOpen,
        onClose: props.onClose,

        isOpen: props.isOpen,

        onCreated: initialize,
        
        cartItems: cartItems,

        price: price,

        isLoading: isLoading,

        isPlaceOrderButtonDisabled: isPlaceOrderButtonDisabled,
        onPlaceOrderButtonClicked: onPlaceOrderButtonClicked,

        onCloseButtonClicked: onCloseButtonClicked,

        onDecreaseQuantityButtonClicked: onDecreaseQuantityButtonClicked,
        onIncreaseQuantityButtonClicked: onIncreaseQuantityButtonClicked 
    };

    return (
        <CartControllerContext.Provider value={controller}>
            <CartUI />
        </CartControllerContext.Provider>
    );
};