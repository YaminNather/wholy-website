import { FC, useCallback, useContext } from "react";
import Image from "next/image";
import styles from "./cart_item_list_item_styles.module.scss";
import classNames from "classnames";
import CartItem from "../../../../../models/cart_item";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../../../../loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import { CartController, CartControllerContext } from "../../cart_controller";
import { Stepper } from "./stepper/stepper";

export interface CartItemListItemProps {
    cartItem: CartItem;
}

export const CartItemListItem: FC<CartItemListItemProps> = (props) => {
    const controller: CartController = useContext(CartControllerContext)!;

    const onClickDecreaseQuantityButton = useCallback(
        (): void => controller.onDecreaseQuantityButtonClicked(props.cartItem),
        []
    );
        
    const onClickIncreaseQuantityButton = useCallback(
        (): void => controller.onIncreaseQuantityButtonClicked(props.cartItem),
        []                 
    );

    return (
        <div className={styles.cart_item_list_item}>
            <div className={classNames(styles.area, styles.product_image_container)}>
                <Image src={props.cartItem.product.wrappedCookieImage} alt="" width={518} height={754} className={styles.product_image} />
            </div>
            
            <div className={classNames(styles.area, styles.titles_area)}>
                <p className={styles.product_name}>{props.cartItem.product.name}</p>

                <Stepper
                    value={props.cartItem.itemCount} 
                    onClickDecreaseQuantityButton={onClickDecreaseQuantityButton} 
                    onClickIncreaseQuantityButton={onClickIncreaseQuantityButton}
                    className={styles.quantity_stepper}
                />
            </div>
        </div>
    );
};