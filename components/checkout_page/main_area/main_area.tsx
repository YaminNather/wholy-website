import { FC } from "react";
import styles from "./main_area_styles.module.scss";
import classNames from "classnames";
import { OrderSummaryArea } from "./order_summary_area/order_summary_area";
import { CheckoutForm } from "./checkout_form/checkout_form";
import { PriceDetailsArea } from "./price_details_area/price_details_area";


export const MainArea: FC = () => {
    return (
        <div className={classNames("container", styles.main_area)}>
            <div className={styles.left_grid_cell}>
                <CheckoutForm />
            </div>

            <div className={styles.right_grid_cell}>
                <OrderSummaryArea className={styles.order_summary_area} />

                <PriceDetailsArea className={styles.price_details_area} />
            </div>
        </div>
    );
};