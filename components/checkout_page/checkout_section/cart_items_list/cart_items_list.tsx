import { FC, useContext, useState } from "react";
import { CheckoutPageData, checkoutPageDataContext } from "../../checkout_page_data";
import styles from "./cart_items_list_styles.module.scss";
import { CartItemListItem } from "./cart_item_list_item";

export const CartItemsList: FC = (props) => {
    const checkoutPageData: CheckoutPageData = useContext(checkoutPageDataContext)!;

    return (
        <div className={styles.cart_area}>
            <h1>Items in Cart</h1>

            <ul>
                {checkoutPageData.cartItems.map((value, index, array) => {
                    return (
                        <li key={index}>
                            <CartItemListItem cartItem={value} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};