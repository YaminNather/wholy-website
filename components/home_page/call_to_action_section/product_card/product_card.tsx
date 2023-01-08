import { CSSProperties, FC } from "react";
import Image from "next/image";

import styles from "./product_card_styles.module.scss";
import classNames from "classnames";
import { UIProduct } from "../../../../product_ui_details/ui_product";

export interface ProductCardProps {
    style?: CSSProperties;
    className?: string;
    uiProduct: UIProduct;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    return (
        <div style={{backgroundColor: props.uiProduct.color, ...props.style}} className={classNames(styles.card, props.className)}>
            <div className={styles.cookie_container}>
                <Image src={props.uiProduct.wrappedCookieImage} alt="" className={styles.cookie} />
            </div>

            <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.corner_fruit, styles.top_right_fruit)} />
            
            <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.corner_fruit, styles.bottom_left_fruit)} />
        </div>
    );
};