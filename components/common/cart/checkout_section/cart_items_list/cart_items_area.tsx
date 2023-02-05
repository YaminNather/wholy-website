import Link from "next/link";
import Image from "next/image";
import { FC, useCallback, useContext } from "react";
import styles from "./cart_items_area_styles.module.scss";
import { CartItemListItem } from "./cart_item_list_item";
import { CartController, CartControllerContext } from "../../cart_controller";
import KeepItRealImage from "../../../../../public/cart/keep-it-real.png";

export const CartItemsArea: FC = (props) => {
    const controller: CartController = useContext(CartControllerContext)!;

    const buildCartItemsList = useCallback(
        () => {
            if(controller.cartItems.length === 0) {
                return (
                    <>
                        <Image src={KeepItRealImage} alt="" className={styles.keep_it_real} />

                        <p className={styles.empty_cart_label}>The cart is really really empty. Bag some wholesome goodies and fill up your cart!</p>

                        <Link href="/shop">
                            <button className={styles.buy_now_button}>RETURN TO SHOP</button>
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
                                    <li key={value.product.id}>
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