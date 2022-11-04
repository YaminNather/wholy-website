import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { checkoutPageDataContext } from "../components/checkout_page/checkout_page_data";
import { CheckoutSection } from "../components/checkout_page/checkout_section/checkout_section";
import { HeaderSection } from "../components/common_sections/header_section/header_section";
import { LoadingIndicatorModal } from "../components/loading_indicator_modal/loading_indicator_modal";
import CartBridge from "../models/cart_bridge";
import CartItem from "../models/cart_item";
import FirebaseCartBridge from "../models/firebase_cart_bridge";

const CheckoutPage: NextPage = () => {
    const cart: CartBridge = useMemo(() => new FirebaseCartBridge(), []);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(
        () => {
            const asyncPart = async (): Promise<void> => {
                if(typeof(window) === "undefined") return;

                await cart.pullDatabaseInfo();
                const newCartItems: CartItem[] = Object.values(cart.cartItems!);
                setCartItems(newCartItems);
                setIsLoading(false);
            }

            asyncPart();
        },
        []
    );

    return (
        <checkoutPageDataContext.Provider value={{ cart: cart, cartItems: cartItems }}>
            <LoadingIndicatorModal isVisible={isLoading} />

            <HeaderSection />

            <CheckoutSection />
        </checkoutPageDataContext.Provider>
    );
};


export default CheckoutPage;