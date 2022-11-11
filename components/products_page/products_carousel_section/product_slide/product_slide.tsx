import classNames from "classnames";
import { FC, useCallback, useContext } from "react";
import Image from "next/image";
import { CarouselSlide } from "../../../Carousel/CarouselSlide";
import styles from "./product_slide_styles.module.scss";

import nameBackgroundImage from "../../../../public/products/products-carousel/name-background.png";
import uniqueSellingPointsImage from "../../../../public/products/products-carousel/unique-selling-points.png";
import badgeImage from "../../../../public/products/products-carousel/badge.png";
import leavesImage from "../../../../public/products/products-carousel/leaves.png";
import concentricCircleImage from "../../../../public/products/products-carousel/concentric-circles.png";
import arrowImage from "../../../../public/products/products-carousel/arrow.png";
import cookieImage from "../../../../public/products/products-carousel/cookie.png";

import Product from "../../../../models/product";
import CartBridge from "../../../../models/cart_bridge";
import { getAuth } from "firebase/auth";
import { NextRouter, useRouter } from "next/router";
import FirebaseCartBridge from "../../../../models/firebase_cart_bridge";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../../../loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import { ProductsPageData, ProductsPageDataContext } from "../../products_page_data";

export interface ProductSlideProps {
    index: number;
    product: Product;
}

export const ProductSlide: FC<ProductSlideProps> = (props) => {
    const router: NextRouter = useRouter();
    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;
    
    const productsPageData: ProductsPageData = useContext(ProductsPageDataContext)!;

    const onClickedAddToCartButton = useCallback(
        async (): Promise<void> => {
            if(getAuth().currentUser === null) {
                router.push({
                    pathname: "/authentication",
                    query: {
                        "from": "products",
                        "action": "add-to-cart",
                        "product": props.product.id
                    }
                });
                return;
            }

            await productsPageData.addToCart(props.product.id);
        },
        []
    );

    const onClickedBuyNowButton = useCallback(
        async(): Promise<void> => {
            if(getAuth().currentUser === null) {
                router.push({
                    pathname: "/authentication",
                    query: {
                        "from": "products",
                        "action": "buy-now",
                        "product": props.product.id
                    }
                });
                return;
            }

            loadingIndicatorData.setIsLoading(true);
            
            const cart: CartBridge = new FirebaseCartBridge();            
            await cart.pullDatabaseInfo();
                        
            await cart.addProduct(props.product.id, 1);            
            
            loadingIndicatorData.setIsLoading(false);
            
            router.push("/checkout");
        },
        []
    );

    return (
        <CarouselSlide index={props.index}>
            <div className={styles.product_slide} style={{backgroundColor: props.product.color}}>
                <Image src={props.product.fruitImage} width={518} height={783} alt="" className={classNames(styles.background_prop, styles.fruit, styles.top_left_fruit)}/>
                
                <Image src={props.product.fruitImage} width={518} height={783} alt="" className={classNames(styles.background_prop, styles.fruit, styles.bottom_right_fruit_0)} />
                
                <Image src={props.product.fruitImage} width={518} height={783} alt="" className={classNames(styles.background_prop, styles.fruit, styles.bottom_right_fruit_1)} />
                
                <Image src={badgeImage} alt="" className={classNames(styles.background_prop, styles.badge)} />

                <Image src={concentricCircleImage} alt="" className={classNames(styles.concentric_circle, styles.top_left_concentric_circle)} />
                
                <Image src={concentricCircleImage} alt="" className={classNames(styles.concentric_circle, styles.bottom_right_concentric_circle)} />

                <div className={classNames("container", styles.container)}>
                    <h1>
                        WHOLEGRAIN
                        <br />Fruit Filled Cookies
                    </h1>

                    <div className={styles.product_name_container}>
                        <Image src={nameBackgroundImage} alt="" className={classNames(styles.product_name_background)} />
                        
                        <h1 style={{color: props.product.color}}>{props.product.name.toUpperCase()}</h1>
                    </div>

                    <Image src={uniqueSellingPointsImage} alt="" />

                    <div className={styles.bottom_area}>
                        <div className={styles.cookie_grid}>
                            <Image src={leavesImage} alt="" className={classNames(styles.leaves)} />

                            <Image src={props.product.cookieImage} width={2373 / 2} height={773 / 2} alt="" className={styles.cookie} />

                            <ul className={styles.unique_selling_points}>
                                <li>
                                    Heart healthy nuts and seeds.
                                    
                                    <Image src={arrowImage} alt="" />
                                </li>
                                
                                <li>
                                    Stuff found in your kitchen.

                                    <Image src={arrowImage} alt="" />
                                </li>
                            </ul>
                        </div>                        
                    </div>

                    <div className={styles.buttons_area}>
                        <button onClick={(event) => onClickedAddToCartButton()}>ADD TO CART</button>
                        
                        <button onClick={(event) => onClickedBuyNowButton()} className={styles.buy_now_button}>BUY NOW</button>
                    </div>
                </div>
            </div>
        </CarouselSlide>
    );
};