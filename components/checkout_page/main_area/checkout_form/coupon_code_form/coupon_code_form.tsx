import classNames from "classnames";
import { CSSProperties, FC, useContext } from "react";

import styles from "./coupon_code_form_styles.module.scss";
import { YellowUnderline } from "../../../../text_highlighters/underline/underline";
import { CheckoutPageController, CheckoutPageControllerContext } from "../../../checkout_page_controller";

export interface CouponCodeFormProps {
    style?: CSSProperties;
    className?: string;
}

export const CouponCodeForm: FC<CouponCodeFormProps> = (props) => {
    const controller: CheckoutPageController = useContext(CheckoutPageControllerContext)!;

    return (
        <div style={props.style} className={classNames("dark_theme", styles.coupon_code_form, props.className)}>
            <YellowUnderline><p className={"personalized_text"}>Got a coupon?</p></YellowUnderline>

            <div className={styles.input_field_area}>
                <input
                    placeholder="Enter Coupon Code" 
                    value={controller.couponCode} 
                    onChange={(event) => controller.setCouponCode(event.target.value)} 
                />

                <button className={"button_yellow"} onClick={(event) => controller.onApplyCouponCodeButtonClicked()}>APPLY</button>
            </div>
        </div>
    );
};