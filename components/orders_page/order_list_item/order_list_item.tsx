import { CSSProperties, FC, ReactNode, useCallback } from "react";
import Image from "next/image";

import styles from "./order_list_item_styles.module.scss";

// import cookieImage from "../../../public/orders/cookie.png";
import classNames from "classnames";
import { ListItem } from "../../list_item/list_item";
import { Leading } from "../../list_item/leading";
import { Main } from "../../list_item/main";
import { OrderBridge } from "../../../models/order_bridge";
import { OrderListItemDetails } from "../order_list_item_details";
import { UIProducts } from "../../../product_ui_details/ui_products";
import { ShipmentTrackActivity, TrackingData } from "../../../shiprocket/models/track_order_response";

export interface OrderListItemProps {
    className?: string;
    style?: CSSProperties;
    order: OrderListItemDetails;
}

export const OrderListItem: FC<OrderListItemProps> = (props) => {
    const buildDeliveryDetails = useCallback(
        (): ReactNode => {
            const trackingData: TrackingData | undefined = props.order.trackingData;
            if (trackingData === undefined) {
                return (
                    <li>
                        <span className={styles.heading}>Status</span>: Preparing
                    </li>
                );
            }

            const latestActivity: ShipmentTrackActivity = trackingData.shipment_track_activities[0];
            return (
                <>
                    <li>
                        <span className={styles.heading}>Status</span>: {latestActivity.activity}
                    </li>

                    <li>
                        <span className={styles.heading}>Current Location:</span> {latestActivity.location}
                    </li>
                </>
            );
        },
        [props.order.trackingData]
    );

    return ( 
        <div style={props.style} className={classNames(styles.order_list_item, props.className)}>
            <div className={styles.top_area}>
                <p className={styles.order_id}>ORDER ID: {props.order.id}</p>
            </div>

            <ul className={styles.order_items_list_container}>
                {props.order.items.map(
                    (value, index, array) => {
                        return (
                            <li key={index}>
                                <ListItem className={styles.order_item_list_item}>
                                    <Leading>
                                        <div className={styles.product_image_container}>
                                            <Image src={UIProducts.withId(value.product.id)!.wrappedCookieImage} width={240} height={128} alt="" className={classNames(styles.product_image)} />
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

            <div className={styles.delivery_details_area}>
                <h2>Delivery Details</h2>

                <ul>
                    {buildDeliveryDetails()}
                </ul>
            </div>

            <button className={styles.track_order_button}>Track Order</button>
        </div>
    );
};