import { FC, useCallback, useContext, useState } from "react";
import { CheckoutPageData, checkoutPageDataContext } from "../../checkout_page_data";
import styles from "./cart_items_area_styles.module.scss";
import { CartItemListItem } from "./cart_item_list_item";

export const CartItemsArea: FC = (props) => {
    const checkoutPageData: CheckoutPageData = useContext(checkoutPageDataContext)!;

    const buildCartItemsList = useCallback(
        () => {
            if(checkoutPageData.cartItems.length === 0) {
                return (
                    <p className={styles.empty_cart_label}>Cart is empty!</p>
                );
            }

            return (
                <>
                    <p className={styles.informal_message}>Nice! We see you&#39;ve loaded up on that good fiber!</p>

                    <ul className={styles.cart_items_list}>
                        {checkoutPageData.cartItems.map(
                            (value, index, array) => {
                                return (
                                    <li key={index}>
                                        <CartItemListItem cartItem={value} />
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </>
            );
        },
        [checkoutPageData]
    );

    return (
        <div className={styles.cart_area}>
            <h1>ITEMS IN CART</h1>

            {buildCartItemsList()}
        </div>
    );
};