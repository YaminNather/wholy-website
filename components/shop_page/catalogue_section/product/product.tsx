import { CSSProperties, FC } from "react";
import styles from "./product_styles.module.scss";
import { UIProduct } from "../../../../product_ui_details/ui_product";
import { ProductCard } from "./product_card/product_card";
import classNames from "classnames";

export interface ProductProps {
    style?: CSSProperties;
    className?: string;
    product: UIProduct;
    backFaceText: string;
}

export const Product: FC<ProductProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.container, props.className)}>
            <div className={styles.flipping_card_container}>
                <ProductCard uiProduct={props.product} backFaceText={props.backFaceText} className={styles.flipping_card} />
            </div>

            <h6>{props.product.name.toUpperCase()} &nbsp;| &nbsp;Rs 50</h6>

            <div className={styles.buttons_area}>
                <button>ADD TO CART</button>

                <button>BUY NOW</button>
            </div>
        </div>
    );
};