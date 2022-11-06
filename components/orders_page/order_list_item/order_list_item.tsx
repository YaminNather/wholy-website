import { CSSProperties, FC } from "react";
import Image from "next/image";

import styles from "./order_list_item_styles.module.scss";

// import cookieImage from "../../../public/orders/cookie.png";
import classNames from "classnames";
import { ListItem } from "../../list_item/list_item";
import { Leading } from "../../list_item/leading";
import { Main } from "../../list_item/main";

export interface OrderListItemProps {
    className?: string;
    style?: CSSProperties;
}

export const OrderListItem: FC<OrderListItemProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.order_list_item, props.className)}>
            <h2><u>Order ID: 12312</u></h2>

            <ul className={styles.order_items_list_container}>
                <li>
                    <ListItem className={styles.order_item_list_item}>
                        <Leading>
                            <div className={classNames(styles.product_image)} />
                        </Leading>

                        <Main>
                            <p className={styles.area}>7 x Strawberry Wholegrain Cookie Bar</p>
                        </Main>
                    </ListItem>
                    
                    <ListItem className={styles.order_item_list_item}>
                        <Leading>
                            <div className={classNames(styles.product_image)} />
                        </Leading>

                        <Main>
                            <p className={styles.area}>7 x Strawberry Wholegrain Cookie Bar</p>
                        </Main>
                    </ListItem>
                </li>
            </ul>

            <button>Track Order</button>
        </div>
    );
};