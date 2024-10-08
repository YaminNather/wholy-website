import classNames from "classnames";
import { CSSProperties, FC, ReactNode, useCallback, useContext, useState } from "react";
import styles from "./price_details_area_styles.module.scss";
import { Accordion } from "../../../accordion/accordion";
import { Header } from "../../../accordion/header";
import { Content } from "../../../accordion/content";
import { PriceDetails } from "../../price_details";
import { CheckoutPageController, CheckoutPageControllerContext } from "../../checkout_page_controller";

export interface PriceDetailsAreaProps {
    className?: string;
    style?: CSSProperties;
}

export const PriceDetailsArea: FC<PriceDetailsAreaProps> = (props) => {
    const controller: CheckoutPageController = useContext(CheckoutPageControllerContext)!;
    
    const [isSubDetailsAreaOpened, setIsSubDetailsAreaOpened] = useState<boolean>(true);

    // const couponCode: string = "123";

    const buildCouponCodeDiscountArea = useCallback(
        (): ReactNode => {
            if(controller.priceDetails.couponCode === undefined)
                return <></>;

            return (
                <div className={classNames(styles.detail_container, styles.coupon_discount_detail_container)}>
                    <div className={styles.left_area}>
                        <p>Coupon Discount</p>

                        <p className={styles.coupon_code}>{controller.priceDetails.couponCode}</p>

                        <button 
                            onClick={controller.onRemoveCouponCodeButtonClicked}
                            style={{display: (!controller.checkout.isUsingCouponCode) ? "none" : undefined}}
                            className={classNames("icon_button", styles.remove_applied_coupon_code_button)}
                        >
                            <span className={classNames("material-symbols-outlined")}>remove</span>
                        </button>
                    </div>
 
                    <p>- &#x20B9; {controller.priceDetails.couponCodeDiscountPrice}</p>

                </div>
            );
        },
        [controller.priceDetails]
    );

    const hasAboveHundredDiscount: boolean = controller.priceDetails.cartPrice >= 100.0;

    return (
        <div style={props.style} className={classNames(props.className, styles.price_details_area)}>
            <Accordion isExpanded={isSubDetailsAreaOpened}>
                <Header onToggled={(isExpanded) => setIsSubDetailsAreaOpened(isExpanded)}>
                    <h6 className={styles.heading}>Price Summary</h6>
                </Header>

                <Content>
                    <div className={styles.detail_container}>
                        <p>Item Subtotal</p>

                        <p>&#x20B9; {controller.priceDetails.cartPrice}</p>
                    </div>
                    
                    {/* <div className={styles.detail_container}>
                        <p className={styles.name}>Item Discount</p>

                        <p className={styles.value}>- &#x20B9; 101</p>
                    </div> */}
                    
                    {buildCouponCodeDiscountArea()}
                    
                    <div className={styles.detail_container}>
                        <p>Shipping</p>

                        <p>
                            <span style={{textDecoration: (hasAboveHundredDiscount) ? "line-through" : "revert"}}>
                                &#x20B9; {controller.priceDetails.shippingCost}
                            </span> 
                            &nbsp;<span style={{display: (hasAboveHundredDiscount) ? "revert" : "none"}}>&#x20B9; 0</span>
                        </p>
                    </div>
                </Content>
            </Accordion>            

            <div className={styles.detail_container}>
                <p className={classNames(styles.name, styles.heading)}>Order Total</p>

                <p className={styles.value}>&#x20B9; {controller.priceDetails.totalPrice}</p>
            </div>
        </div>
    );
};