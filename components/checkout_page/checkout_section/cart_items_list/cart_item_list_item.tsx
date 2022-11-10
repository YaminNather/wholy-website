import { FC, useCallback, useContext } from "react";
import Image from "next/image";
import CartItem from "../../../../models/cart_item";
import styles from "./cart_item_list_item_styles.module.scss";
import { CheckoutPageData, checkoutPageDataContext } from "../../checkout_page_data";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../../../loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";

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
            <Image src={props.cartItem.product.fruitImage} alt="" width={518} height={754} className={styles.product_image} />
            
            <p className={styles.product_name}>{props.cartItem.product.name}</p>

            <div className={styles.quantity_information_area}>
                <button onClick={(event) => onClickDecreaseQuantityButton()}>{"<"}</button>

                <p className={styles.quantity_label}>{props.cartItem.itemCount}</p>

                <button onClick={(event) => onClickIncreaseQuantityButton()}>{">"}</button>
            </div>
        </div>
    );
};