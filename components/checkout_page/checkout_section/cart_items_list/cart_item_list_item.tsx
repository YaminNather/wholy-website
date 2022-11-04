import { FC } from "react";
import Image from "next/image";
import CartItem from "../../../../models/cart_item";
import styles from "./cart_item_list_item_styles.module.scss";

export interface CartItemListItemProps {
    cartItem: CartItem;
}

export const CartItemListItem: FC<CartItemListItemProps> = (props) => {
    return (
        <div className={styles.cart_item_list_item}>
            <Image src={props.cartItem.product.fruitImage} alt="" width={518} height={754} className={styles.product_image} />
            
            <p className={styles.product_name}>{props.cartItem.product.name}</p>

            <div className={styles.quantity_information_area}>
                <button>{"<"}</button>

                <p className={styles.quantity_label}>{props.cartItem.itemCount}</p>

                <button>{">"}</button>
            </div>
        </div>
    );
};