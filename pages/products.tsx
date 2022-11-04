import { NextPage } from "next";
import { BenefitsSection } from "../components/products_page/benefits_section/benefits_section";
import { DiscountSection } from "../components/common_sections/discount_section/discount_section";
import { HeaderSection } from "../components/common_sections/header_section/header_section";
import { ProductsCarouselSection } from "../components/products_page/products_carousel_section/products_carousel_section";

import greyTexturedBackgroundImage from "../public/grey-textured-background.png";
import { FooterSection } from "../components/common_sections/footer_section/footer_section";
import { NavMenu } from "../components/nav_menu/nav_menu";
import { AppBar } from "../components/app_bar/app_bar";
import { useCallback, useContext, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import CartBridge from "../models/cart_bridge";
import FirebaseCartBridge from "../models/firebase_cart_bridge";
import { ProductsPageDataContext } from "../components/products_page/products_page_data";
import ProductRepository from "../repository/product_repository";
import FirebaseProductRepository from "../repository/firebase_product_repository";
import Product from "../models/product";
import { getAuth } from "firebase/auth";

const ProductsPage: NextPage = () => {
    const router: NextRouter = useRouter();

    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;

    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    const addToCart = useCallback(
        async (productId: string): Promise<void> => {
            loadingIndicatorData.setIsLoading(true);
            
            const cart: CartBridge = new FirebaseCartBridge();
            await cart.pullDatabaseInfo();
                        
            await cart.addProduct(productId, 1);
            

            const productRepository: ProductRepository = new FirebaseProductRepository();
            const product: Product = await productRepository.getProduct(productId);
            
            alert(`Added ${product.name} to cart`);
            loadingIndicatorData.setIsLoading(false);
        },
        []
    );


    useEffect(
        () => {
            const asyncPart = async (): Promise<void> => {
                if(typeof(window) === "undefined" || getAuth().currentUser === null) return;

                if(router.query["from"] === "authentication") {
                    const productId: string = router.query["product"] as string;

                    await addToCart(productId);
                }
            };

            asyncPart();
        },
        []
    );

    return (
        <ProductsPageDataContext.Provider value={{addToCart: addToCart}}>
            <AppBar isNavMenuOpen={isNavMenuOpen} onToggleNavMenuButtonPressed={(isOpen) => setIsNavMenuOpen(isOpen)} />

            <NavMenu isOpen={isNavMenuOpen} />

            <HeaderSection />

            <ProductsCarouselSection />

            <BenefitsSection />

            <DiscountSection titleColor="#f1ad35" backgroundImage={greyTexturedBackgroundImage} />

            <FooterSection />
        </ProductsPageDataContext.Provider>
    );
};

export default ProductsPage;