import { FC, useCallback, useContext } from "react";
import Image from "next/image";
import CartItem from "../../../../models/cart_item";
import styles from "./cart_item_list_item_styles.module.scss";
import { CheckoutPageData, checkoutPageDataContext } from "../../checkout_page_data";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../../../loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import classNames from "classnames";

export interface CartItemListItemProps {
    cartItem: CartItem;
}

export const CartItemListItem: FC<CartItemListItemProps> = (props) => {
    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;
    const checkoutPageData: CheckoutPageData = useContext(checkoutPageDataContext)!;

    const onClickDecreaseQuantityButton = useCallback(
        async (): Promise<void> => {
            loadingIndicatorData.setIsLoading(true);
            
            await checkoutPageData.checkout.cart.removeProduct(props.cartItem.product.id, 1);
            
            loadingIndicatorData.setIsLoading(false);
        },
        [checkoutPageData]
        );
        
        const onClickIncreaseQuantityButton = useCallback(
            async (): Promise<void> => {
            loadingIndicatorData.setIsLoading(true);
            
            await checkoutPageData.checkout.cart.addProduct(props.cartItem.product.id, 1);

            loadingIndicatorData.setIsLoading(false);
        },
        [checkoutPageData]
    );

    return (
        <div className={styles.cart_item_list_item}>
            <div className={classNames(styles.area, styles.product_image_container)}>
                <Image src={props.cartItem.product.wrappedCookieImage} alt="" width={518} height={754} className={styles.product_image} />
            </div>
            
            <div className={classNames(styles.area, styles.titles_area)}>
                <p className={styles.product_name}>{props.cartItem.product.name}</p>
                
                <p className={styles.subtitle}>Wholegrain Fruit-Filled Cookie</p>
            </div>

            <div className={classNames(styles.area, styles.quantity_information_area)}>
                <div className={classNames(styles.quantity_stepper)}>
                    <button onClick={(event) => onClickDecreaseQuantityButton()} className={styles.left_button}>{"-"}</button>

                    <p className={styles.quantity_label}>{props.cartItem.itemCount} Bar{(props.cartItem.itemCount < 2) ? "" : "s"}</p>

                    <button onClick={(event) => onClickIncreaseQuantityButton()} className={styles.right_button}>{"+"}</button>
                </div>
            </div>
        </div>
    );
};