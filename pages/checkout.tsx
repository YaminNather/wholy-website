import { getAuth } from "firebase/auth";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppBar } from "../components/app_bar/app_bar";
import { checkoutPageDataContext } from "../components/checkout_page/checkout_page_data";
import { CheckoutSection } from "../components/checkout_page/checkout_section/checkout_section";
import { HeaderSection } from "../components/common_sections/header_section/header_section";
import { LoadingIndicatorModalWrapper } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import { NavMenu } from "../components/nav_menu/nav_menu";
import CartBridge from "../models/cart_bridge";
import CartItem from "../models/cart_item";
import FirebaseCartBridge from "../models/firebase_cart_bridge";

const CheckoutPage: NextPage = () => {
    const router: NextRouter = useRouter();

    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;

    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    const cart: CartBridge = useMemo(() => new FirebaseCartBridge(), []);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // const 

    useEffect(
        () => {
            const asyncPart = async (): Promise<void> => {
                if(typeof(window) === "undefined" || getAuth().currentUser === null) return;
                
                loadingIndicatorData.setIsLoading(true);
                await cart.pullDatabaseInfo();

                if(router.query["from"] === "authentication" && router.query["action"] === "buy-now") {
                    const productId: string = router.query["product"] as string;
                    await cart.addProduct(productId, 1);

                    console.log(`CustomLog: Added product in authentication page`);
                }
                
                const newCartItems: CartItem[] = Object.values(cart.cartItems!);
                setCartItems(newCartItems);

                loadingIndicatorData.setIsLoading(false);
            }

            asyncPart();
        },
        []
    );

    return (
        <checkoutPageDataContext.Provider value={{ cart: cart, cartItems: cartItems, setCartItems: setCartItems }}>
            <LoadingIndicatorModalWrapper>
                <AppBar isNavMenuOpen={isNavMenuOpen} onToggleNavMenuButtonPressed={(isOpen) => setIsNavMenuOpen(isOpen)} />

                <NavMenu isOpen={isNavMenuOpen} />

                <HeaderSection />

                <CheckoutSection />
            </LoadingIndicatorModalWrapper>
        </checkoutPageDataContext.Provider>
    );
};


export default CheckoutPage;