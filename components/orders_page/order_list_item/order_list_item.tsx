import { CSSProperties, FC } from "react";
import Image from "next/image";

import styles from "./order_list_item_styles.module.scss";

// import cookieImage from "../../../public/orders/cookie.png";
import classNames from "classnames";

export interface OrderListItemProps {
    className?: string;
    style?: CSSProperties;
}

export const OrderListItem: FC<OrderListItemProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.order_list_item, props.className)}>
            <h2><u>Order ID: 12312</u></h2>

            <div className={styles.order_items_list_container}>
                <div className={styles.order_item_list_item}>
                    <div className={styles.product_image} />
                    {/* <Image src={cookieImage} alt="" /> */}

                    <p>7 x Strawberry Wholegrain Cookie Bar</p>
                </div>
                
                <div className={styles.order_item_list_item}>
                    <div className={styles.product_image} />
                    {/* <Image src={cookieImage} alt="" /> */}

                    <p>7 x Strawberry Wholegrain Cookie Bar</p>
                </div>
            </div>

            <button>Track Order</button>
        </div>
    );
};