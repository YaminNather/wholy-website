import Link from "next/link";
import { FC, useCallback, useContext, useState } from "react";
import styles from "./cart_items_area_styles.module.scss";
import { CartItemListItem } from "./cart_item_list_item";
import { CartController, CartControllerContext } from "../../cart_controller";

export const CartItemsArea: FC = (props) => {
    const controller: CartController = useContext(CartControllerContext)!;

    const buildCartItemsList = useCallback(
        () => {
            if(controller.cartItems.length === 0) {
                return (
                    <>
                        <p className={styles.empty_cart_label}>Cart is empty!</p>

                        <Link href="/products#products-carousel">
                            <button className={styles.buy_now_button}>Buy Now!</button>
                        </Link>
                    </>
                );
            }

            return (
                <>
                    <ul className={styles.cart_items_list}>
                        {controller.cartItems.map(
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
        [controller]
    );

    return (
        <div className={styles.cart_area}>
            {buildCartItemsList()}
        </div>
    );
};