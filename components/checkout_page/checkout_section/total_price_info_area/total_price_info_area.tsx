import classNames from "classnames";
import { CSSProperties, FC, ReactNode, useCallback, useContext } from "react";
import { Checkout, ShippingMethod } from "../../../../models/checkout";
import { CheckoutPageData, checkoutPageDataContext } from "../../checkout_page_data";
import styles from "./total_price_info_area_styles.module.scss";

export interface TotalPriceInfoAreaDetails {
    couponCodeDiscountPrice: number;
    shippingCost: number;
    totalPrice: number;
}

export interface TotalPriceInfoAreaProps {
    className?: string;
    style?: CSSProperties;
    details: TotalPriceInfoAreaDetails;
}

export const TotalPriceArea: FC<TotalPriceInfoAreaProps> = (props) => {
    const pageData: CheckoutPageData = useContext(checkoutPageDataContext)!;

    const buildCouponCodeDiscountArea = useCallback(
        (): ReactNode => {
            if(pageData.checkout.couponCode === "")
                return <></>;

            return (
                <div className={classNames(styles.detail_container, styles.coupon_discount_detail_container)}>
                    <div className={styles.left_area}>
                        <p>Coupon Discount</p>
                        
                        <p className={styles.coupon_code}>{pageData.checkout.couponCode}</p>
                    </div>
 
                    <p>- Rs. {props.details.couponCodeDiscountPrice}</p>

                </div>
            );
        },
        [props.details]
    );

    return (
        <div style={props.style} className={classNames(props.className, styles.total_price_info_area)}>
            <p className={styles.heading}>Price Summary</p>

            <hr />

            <div className={styles.detail_container}>
                <p>Item Subtotal</p>

                <p>Rs {pageData.checkout.cart.price}</p>
            </div>
            
            {/* <div className={styles.detail_container}>
                <p className={styles.name}>Item Discount</p>

                <p className={styles.value}>- Rs. 101</p>
            </div> */}
            
            {buildCouponCodeDiscountArea()}
            
            <div className={styles.detail_container}>
                <p>Shipping</p>

                <p>
                    <span style={{textDecoration: (pageData.checkout.hasAboveHundredDiscount()) ? "line-through" : "revert"}}>
                        Rs. {props.details.shippingCost}
                    </span> 
                    &nbsp;<span style={{display: (pageData.checkout.hasAboveHundredDiscount()) ? "revert" : "none"}}>Rs. 0</span>
                </p>
            </div>
            
            <hr />

            <div className={styles.detail_container}>
                <p className={classNames(styles.name, styles.heading)}>Order Total</p>

                <p className={styles.value}>Rs. {props.details.totalPrice}</p>
            </div>
        </div>
    );
};