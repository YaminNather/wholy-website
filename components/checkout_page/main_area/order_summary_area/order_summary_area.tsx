import { CSSProperties, FC, useContext } from "react";
import { ProductListItem } from "./product_list_item/product_list_item";

import styles from "./order_summary_area_styles.module.scss";
import classNames from "classnames";
import { CheckoutPageController, CheckoutPageControllerContext } from "../../checkout_page_controller";

export interface OrderSummaryAreaProps {
    style?: CSSProperties;
    className?: string;
}

export const OrderSummaryArea: FC<OrderSummaryAreaProps> = (props) => {
    const controller: CheckoutPageController = useContext(CheckoutPageControllerContext)!;

    if (controller.checkout.cart._cartItems === undefined) {
        return <></>;
    }

    return (
        <div style={props.style} className={classNames(styles.order_summary_area, props.className)}>
            <h2>Order Summary</h2>

            <ul>
                {controller.cartItems?.map( 
                    (value, index, array) => {
                        return (
                            <li key={index}>
                                <ProductListItem cartItem={value} /> 
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
};