import { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { GlobalCartController, GlobalCartControllerContext } from "../common/cart/global_cart_controller";
import { getAuth } from "firebase/auth";
import { CartService } from "../../models/cart_service";

export const ProductPage: FC = (props) => {
    const globalCartController: GlobalCartController = useContext(GlobalCartControllerContext)!;

    const router: NextRouter = useRouter();
    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;
        
    const productRepository = useMemo<ProductRepository>(() => new FirebaseProductRepository(), []);
    const cartRef = useRef<CartBridge | null>(null);
    
    const [product, setProduct] = useState<Product | undefined | null>(undefined);
    const [quantity, setQuantity] = useState<number>(1);

    const initialize = useCallback(
        async (): Promise<void> => {
            loadingIndicatorData.setIsLoading(true);
            
            let product: Product;
            try {
                const productName: string = router.query["name"] as string;
                product = await productRepository.getProductByName(productName);
            }
            catch (exception) {
                setProduct(null);
                loadingIndicatorData.setIsLoading(false);
                return;
            }

            setProduct(product);
            
            const cartService: CartService = new CartService();
            cartRef.current = await cartService.getCart();
            const cart: CartBridge = cartRef.current;
            
            loadingIndicatorData.setIsLoading(false);

            if (router.query["from"] !== undefined && router.query["action"] === "get-yours") {
                loadingIndicatorData.setIsLoading(true);
                
                const product: string = router.query["product"] as string;
                const quantity: number = Number(router.query["quantity"] as string);
                
                const productToAdd: Product = await productRepository.getProductByName(product);
                await cart.addProduct(productToAdd.id, quantity);

                globalCartController.setIsOpen(true);
                
                loadingIndicatorData.setIsLoading(false);
            }
        },
        [productRepository]
    );    

    const onIncreaseButtonClicked = useCallback(
        async (): Promise<void> => {
            if (product === undefined || product === null) return;

            setQuantity(quantity + 1);
        },
        [product, quantity]
    );
    
    const onDecreaseButtonClicked = useCallback(
        async (): Promise<void> => {
            if (product === undefined || product === null) return;

            if (quantity === 0) return;

            setQuantity(quantity - 1);
        },
        [product, quantity]
    );

    const getYoursButtonClicked = useCallback(
        async (): Promise<void> => {
            const cart: CartBridge = cartRef.current!;

            // if (quantity === 0) {
            //     alert("Please add items first.");
            //     return;
            // }

            // const query: { [key: string]: string } = {
            //     "from": "product",
            //     "action": "get-yours",
            //     "product": product!.name,
            //     "quantity": quantity.toString()
            // };
            // if (getAuth().currentUser === null) {
            //     router.push({pathname: "/authentication", query: query});
            //     return;
            // }
            loadingIndicatorData.setIsLoading(true);
            await cart.addProduct(product!.id, quantity);
            loadingIndicatorData.setIsLoading(false);

            globalCartController.setIsOpen(true);
            
            setQuantity(0);
        },
        [product, quantity]
    );

    const underCookieGetYoursButtonClicked = useCallback(
        async (): Promise<void> => {
            const cart: CartBridge = cartRef.current!;

            const query: { [key: string]: string } = {
                "from": "product",
                "action": "get-yours",
                "product": product!.name,
                "quantity": Number(1).toString()
            };
            if (getAuth().currentUser === null) {
                router.push({pathname: "/authentication", query: query});
                return;
            }

            await cart.addProduct(product!.id, 1);
            globalCartController.setIsOpen(true);
            setQuantity(0);
        },
        [product, quantity]
    );

    const onAddToCartButtonClicked = useCallback(
        async (product: string): Promise<void> => {
            const cart: CartBridge = cartRef.current!;

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

    if (product === undefined || cartRef.current === null) return <></>;

    if (product === null) return <ErrorPage statusCode={404} />;
    
    const controller: ProductPageController = {
        product: product,
        uiProduct: UIProducts.withId(product.id)!,
        cart: cartRef.current!,
        quantity: quantity,
        onIncreaseButtonClicked: onIncreaseButtonClicked,
        onDecreaseButtonClicked: onDecreaseButtonClicked,
        getYoursButtonClicked: getYoursButtonClicked,
        underCookieGetYoursButtonClicked: underCookieGetYoursButtonClicked,
        onAddToCartButtonClicked: onAddToCartButtonClicked
    };

    return (
        <ProductPageControllerContext.Provider value={controller}>
            <ProductPageUI />
        </ProductPageControllerContext.Provider>
    );
}