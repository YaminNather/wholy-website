import { CSSProperties, FC, useState } from "react";
import Image from "next/image";

import styles from "./product_card_styles.module.scss";
import { UIProduct } from "../../../../product_ui_details/ui_product";

import { FlippingProductCard } from "./flipping_product_card/flipping_product_card";
import classNames from "classnames";

export interface ProductCardProps {
    style?: CSSProperties;
    className?: string;
    uiProduct: UIProduct;
    backfaceText: string;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    return (
        <div className={styles.product_card}>
            <FlippingProductCard className={styles.flipping_card} uiProduct={props.uiProduct} backFaceText={props.backfaceText} />
            
            <p className={styles.product_name}>{props.uiProduct.name.toUpperCase()}</p>

            <button className={classNames("button_yellow", styles.add_to_cart_button)}>
                ADD TO CART
            </button>
        </div>
    );
};