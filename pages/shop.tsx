import { NextPage } from "next";
import { useCallback, useContext } from "react";
import { getAuth } from "firebase/auth";
import { NextRouter, useRouter } from "next/router";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import CartBridge from "../models/cart_bridge";
import FirebaseCartBridge from "../models/firebase_cart_bridge";
import { ShopPageContext, ShopPageData } from "../components/shop_page/shop_page_data";
import { ShopPageUI } from "../components/shop_page/shop_page_ui";
import { GlobalCartController, GlobalCartControllerContext } from "../components/common/cart/global_cart_controller";

const ShopPage: NextPage = () => {
    const router: NextRouter = useRouter();
    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;
    const globalCartController: GlobalCartController = useContext(GlobalCartControllerContext)!;

    const addToCart = useCallback(
        async (productId: string): Promise<void> => {
            loadingIndicatorData.setIsLoading(true);
            
            const cart: CartBridge = new FirebaseCartBridge();
            await cart.pullDatabaseInfo();
                        
            await cart.addProduct(productId, 1);
        },
        []
    );

    const onClickedAddToCartButton = useCallback(
        async (productId: string): Promise<void> => {
            if(getAuth().currentUser === null) {
                router.push({
                    pathname: "/authentication",
                    query: {
                        "from": "products",
                        "action": "add-to-cart",
                        "product": productId
                    }
                });
                return;
            }
            
            await loadingIndicatorData.setIsLoading(true);
            
            await addToCart(productId);
            alert("Added to cart!");
            
            await loadingIndicatorData.setIsLoading(false);
        },
        [router, loadingIndicatorData]
    );

    const onClickedBuyNowButton = useCallback(
        async (productId: string): Promise<void> => {
            if(getAuth().currentUser === null) {
                router.push({
                    pathname: "/authentication",
                    query: {
                        "from": "products",
                        "action": "buy-now",
                        "product": productId
                    }
                });
                return;
            }            
            
            loadingIndicatorData.setIsLoading(true);

            await addToCart(productId);

            loadingIndicatorData.setIsLoading(false);
            
            
            globalCartController.setIsOpen(true);
        },
        [router, loadingIndicatorData, globalCartController]
    );

    const controller: ShopPageData = {
        onClickedAddToCartButton: onClickedAddToCartButton,
        onClickedBuyNowButton: onClickedBuyNowButton
    };

    return (
        <ShopPageContext.Provider value={controller}>
            <ShopPageUI />
        </ShopPageContext.Provider>
    );
};

export default ShopPage;