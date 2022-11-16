import { CSSProperties, FC } from "react";
import Image from "next/image";

import styles from "./order_list_item_styles.module.scss";

// import cookieImage from "../../../public/orders/cookie.png";
import classNames from "classnames";
import { ListItem } from "../../list_item/list_item";
import { Leading } from "../../list_item/leading";
import { Main } from "../../list_item/main";
import { OrderBridge } from "../../../models/order_bridge";

export interface OrderListItemProps {
    className?: string;
    style?: CSSProperties;
    order: OrderBridge;
}

export const OrderListItem: FC<OrderListItemProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.order_list_item, props.className)}>
            <div className={styles.top_area}>
                <p className={styles.order_id}>ORDER ID: {props.order.id}</p>

                <button>TRACK ORDER</button>
            </div>

            <ul className={styles.order_items_list_container}>
                {props.order.items.map(
                    (value, index, array) => {
                        return (
                            <li key={index}>
                                <ListItem className={styles.order_item_list_item}>
                                    <Leading>
                                        <div className={styles.product_image_container}>
                                            <Image src={value.product.wrappedCookieImage} width={240} height={128} alt="" className={classNames(styles.product_image)} />
                                        </div>
                                    </Leading>

                                    <Main>
                                        <p className={styles.title}>{value.quantity} x {value.product.name}</p>
                                        
                                        <p className={styles.subtitle}>Wholegrain Fruit-Filled Cookie</p>
                                    </Main>
                                </ListItem>
                            </li>
                        );
                    }
                )}
            </ul>

            <button>Track Order</button>
        </div>
    );
};