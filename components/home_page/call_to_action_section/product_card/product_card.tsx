import { CSSProperties, FC } from "react";
import Image from "next/image";

import styles from "./product_card_styles.module.scss";
import classNames from "classnames";
import { uiProducts } from "../../../../product_ui_details/ui_products";
import { UIProduct } from "../../../../product_ui_details/ui_product";

export interface ProductCardProps {
    style?: CSSProperties;
    className?: string;
    uiProduct: UIProduct;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.card, props.className)}>
            <Image src={uiProducts[0].wrappedCookieImage} alt="" />
        </div>
    );
};