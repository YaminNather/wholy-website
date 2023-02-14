import { CSSProperties, FC } from "react";

import Image from "next/image";

import { ListItem } from "../../../../list_item/list_item";
import { Leading } from "../../../../list_item/leading";
import { Main } from "../../../../list_item/main";
import { Trailing } from "../../../../list_item/trailing";
import { UIProducts } from "../../../../../product_ui_details/ui_products";

import styles from "./product_list_item_styles.module.scss";
import classNames from "classnames";
import CartItem from "../../../../../models/cart_item";

export interface ProductListItemProps {
    style?: CSSProperties;
    className?: string;
    cartItem: CartItem;
}

export const ProductListItem: FC<ProductListItemProps> = (props) => {
    return (
        <ListItem style={props.style} className={classNames(styles.product_list_item, props.className)}>
            <Leading>
                <Image src={UIProducts.withId(props.cartItem.product.id)!.wrappedCookieImage} alt="" />
            </Leading>

            <Main>
                <h3>{props.cartItem.product.name}</h3>
                
                <h3>x{props.cartItem.itemCount}</h3>

                <h3>Rs {props.cartItem.totalPrice()}</h3>
            </Main>

            <Trailing>

            </Trailing>
        </ListItem>
    );
};