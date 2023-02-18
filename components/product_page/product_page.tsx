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

export const ProductPage: FC = (props) => {
    const router: NextRouter = useRouter();
    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;
        
    const productRepository = useMemo<ProductRepository>(() => new FirebaseProductRepository(), []);
    const cart = useMemo<CartBridge>(() => new FirebaseCartBridge(), []);
    
    const [product, setProduct] = useState<Product | undefined | null>(undefined);

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
            await cart.pullDatabaseInfo();
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

    if (product === undefined) return <></>;

    if (product === null) return <ErrorPage statusCode={404} />;
    
    const controller: ProductPageController = {
        product: product,
        uiProduct: UIProducts.withId(product.id)!,
        cart: cart
    };

    return (
        <ProductPageControllerContext.Provider value={controller}>
            <ProductPageUI />
        </ProductPageControllerContext.Provider>
    );
}