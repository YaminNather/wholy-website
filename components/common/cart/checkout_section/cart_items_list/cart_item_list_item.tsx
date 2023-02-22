import { FC, useCallback, useContext } from "react";
import Image from "next/image";
import styles from "./cart_item_list_item_styles.module.scss";
import classNames from "classnames";
import CartItem from "../../../../../models/cart_item";
import { CartController, CartControllerContext } from "../../cart_controller";
import { DecreaseButton, IncreaseButton, QuantityLabel, Stepper } from "../../../stepper/stepper";

export interface CartItemListItemProps {
    cartItem: CartItem;
}

export const CartItemListItem: FC<CartItemListItemProps> = (props) => {
    const controller: CartController = useContext(CartControllerContext)!;

    const onClickDecreaseQuantityButton = useCallback(
        (): void => controller.onDecreaseQuantityButtonClicked(props.cartItem.product.id),
        []
    );
        
    const onClickIncreaseQuantityButton = useCallback(
        (): void => controller.onIncreaseQuantityButtonClicked(props.cartItem.product.id),
        []                 
    );

    return (
        <div className={styles.cart_item_list_item}>
            <div className={classNames(styles.area, styles.product_image_container)}>
                <Image src={props.cartItem.product.wrappedCookieImage} alt="" width={518} height={754} className={styles.product_image} />
            </div>
            
            <div className={classNames(styles.area, styles.titles_area)}>
                <p className={styles.product_name}>{props.cartItem.product.name}</p>

                <Stepper className={styles.quantity_stepper}>
                    <DecreaseButton onClick={onClickDecreaseQuantityButton}>-</DecreaseButton>
                    
                    <QuantityLabel>{`${props.cartItem.itemCount} ${(props.cartItem.itemCount === 0) ? "Bar" : "Bars"}`}</QuantityLabel>

                    <IncreaseButton onClick={onClickIncreaseQuantityButton}>+</IncreaseButton>
                </Stepper>
            </div>
        </div>
    );
};