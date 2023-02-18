import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ProductPageUI } from "./product_page_ui";
import { NextRouter, useRouter } from "next/router";
import ProductRepository from "../../repository/product_repository";
import FirebaseProductRepository from "../../repository/firebase_product_repository";
import Product from "../../models/product";

import ErrorPage from "next/error";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import { ProductPageController, ProductPageControllerContext as ProductPageControllerContext } from "./product_page_controller";
import { UIProducts } from "../../product_ui_details/ui_products";
import CartBridge from "../../models/cart_bridge";
import FirebaseCartBridge from "../../models/firebase_cart_bridge";
import { GlobalCartController, GlobalCartControllerContext } from "../common/cart/global_cart_controller";

export const ProductPage: FC = (props) => {
    const globalCartController: GlobalCartController = useContext(GlobalCartControllerContext)!;

    const router: NextRouter = useRouter();
    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;
        
    const productRepository = useMemo<ProductRepository>(() => new FirebaseProductRepository(), []);
    const cart = useMemo<CartBridge>(() => new FirebaseCartBridge(), []);
    
    const [product, setProduct] = useState<Product | undefined | null>(undefined);
    const [quantity, setQuantity] = useState<number>(0);

    const updateStateFromCart = useCallback(
        (): void => {
            if (product === undefined || product === null) return;

            setQuantity((cart.hasProduct(product!.id)) ? cart.cartItems![product!.id].itemCount : 0);
        },
        [product, cart]
    );

    const initialize = useCallback(
        async (): Promise<void> => {
            loadingIndicatorData.setIsLoading(true);
            
            let product: Product;
            try {
                product = await productRepository.getProductByName(router.query["name"] as string);
            }
            catch (exception) {
                setProduct(null);
                loadingIndicatorData.setIsLoading(false);
                return;
            }

            setProduct(product);
        },
        [productRepository, updateStateFromCart]
    );

    const onIncreaseButtonClicked = useCallback(
        async (): Promise<void> => {
            if (product === undefined || product === null) return;

            loadingIndicatorData.setIsLoading(true);
            await cart.addProduct(product.id, 1);
            loadingIndicatorData.setIsLoading(false);
        },
        [product, cart]
    );
    
    const onDecreaseButtonClicked = useCallback(
        async (): Promise<void> => {
            if (product === undefined || product === null) return;

            loadingIndicatorData.setIsLoading(true);
            await cart.removeProduct(product.id, 1);
            loadingIndicatorData.setIsLoading(false);
        },
        [product, cart]
    );

    const onAddToCartButtonClicked = useCallback(
        async (product: string): Promise<void> => {
            loadingIndicatorData.setIsLoading(true);
            await cart.addProduct(product, 1);
            alert("Added to cart!");
            loadingIndicatorData.setIsLoading(false);
        },
        []
    );

    useEffect(
        () => {
            initialize();
        },
        []
    );

    useEffect(
        () => {
            if (product === undefined || product === null) return;

            const asyncPart = async (): Promise<void> => {
                cart.setOnChangeListener(updateStateFromCart);
                await cart.pullDatabaseInfo();
                
                loadingIndicatorData.setIsLoading(false);
            };

            asyncPart();
        },
        [product]
    );

    useEffect(
        () => {
            const listener = (): void => {
                const asyncPart = async (): Promise<void> => {
                    loadingIndicatorData.setIsLoading(true);
                    await cart.pullDatabaseInfo();
                    updateStateFromCart();
                    loadingIndicatorData.setIsLoading(false);
                };

                asyncPart();
            };
            globalCartController.addOnCloseListener(listener);
            
            return () => globalCartController.removeOnCloseListener(listener);
        },
        [globalCartController, updateStateFromCart]
    );

    if (product === undefined) return <></>;

    if (product === null) return <ErrorPage statusCode={404} />;
    
    const controller: ProductPageController = {
        product: product,
        uiProduct: UIProducts.withId(product.id)!,
        cart: cart,
        quantity: quantity,
        onIncreaseButtonClicked: onIncreaseButtonClicked,
        onDecreaseButtonClicked: onDecreaseButtonClicked,
        onAddToCartButtonClicked: onAddToCartButtonClicked
    };

    return (
        <ProductPageControllerContext.Provider value={controller}>
            <ProductPageUI />
        </ProductPageControllerContext.Provider>
    );
}