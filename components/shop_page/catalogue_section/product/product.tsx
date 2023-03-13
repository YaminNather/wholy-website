import { CSSProperties, FC, useContext } from "react";
import styles from "./product_styles.module.scss";
import { UIProduct } from "../../../../product_ui_details/ui_product";
import { ProductCard } from "./product_card/product_card";
import classNames from "classnames";
import { ShopPageContext, ShopPageData } from "../../shop_page_data";
import Link from "next/link";

export interface ProductProps {
    style?: CSSProperties;
    className?: string;
    product: UIProduct;
    backFaceText: string;
}

export const Product: FC<ProductProps> = (props) => {
    const controller: ShopPageData = useContext(ShopPageContext)!;

    return (
        <div style={props.style} className={classNames(styles.container, props.className)}>
            <div className={styles.flipping_card_container}>
                <ProductCard uiProduct={props.product} backFaceText={props.backFaceText} className={styles.flipping_card} />
            </div>

            <p className={styles.product_name}>{props.product.name.toUpperCase()} &nbsp;| &nbsp;&#x20b9; 50</p>

            <div className={styles.buttons_area}>
                <Link href={`/product/${props.product.name}`}>
                    <button>VIEW DETAILS</button>
                </Link>

                <button onClick={(event) => controller.onClickedBuyNowButton(props.product.id)}>BUY NOW</button>
            </div>
        </div>
    );
};