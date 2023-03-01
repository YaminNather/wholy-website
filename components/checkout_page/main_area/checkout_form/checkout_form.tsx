import { FC, useContext } from "react";
import styles from "./checkout_form_styles.module.scss";
import { CouponCodeForm } from "./coupon_code_form/coupon_code_form";
import { CheckoutPageController, CheckoutPageControllerContext } from "../../checkout_page_controller";
import { states } from "../../../../models/states";
import classNames from "classnames";

export const CheckoutForm: FC = (props) => {
    const controller: CheckoutPageController = useContext(CheckoutPageControllerContext)!;

    return (
        <div className={styles.checkout_form}>
            <h3>Contact Information</h3>

            <input placeholder="First Name" value={controller.contactInformation.firstName} onChange={(event) => controller.setContactInformation({...controller.contactInformation, firstName: event.target.value})} />
                
            <input placeholder="Last Name" value={controller.contactInformation.lastName} onChange={(event) => controller.setContactInformation({...controller.contactInformation, lastName: event.target.value})} />

            <div className={classNames(styles.email_field_area, (controller.isGoogleSignInButtonVisible()) ? styles.button_visible : undefined )}>
                <input placeholder="Email" value={controller.contactInformation.email} onChange={(event) => controller.setContactInformation({...controller.contactInformation, email: event.target.value})} />
                
                <button 
                    onClick={(event) => controller.onGoogleSignInButtonClicked()} 
                    style={{ display: controller.isGoogleSignInButtonVisible() ? undefined : "none" }} 
                    className={classNames("button_yellow")}
                >
                    Google Sign In
                </button>
            </div>
            
            <input placeholder="Phone" value={controller.contactInformation.phone} onChange={(event) => controller.setContactInformation({...controller.contactInformation, phone: event.target.value})} />

            <h3 className={styles.shipping_address_header}>Shipping Address</h3>
            
            <div className={styles.shipping_address_area}>
                <input placeholder="Street 0" value={controller.address.streetAddress0} onChange={(event) => controller.setAddress({...controller.address, streetAddress0: event.target.value})} />
                
                <input placeholder="Street 1" value={controller.address.streetAddress1} onChange={(event) => controller.setAddress({...controller.address, streetAddress1: event.target.value})} />                                
                
                <input placeholder="City" value={controller.address.city} onChange={(event) => controller.setAddress({...controller.address, city: event.target.value})} />

                <input placeholder="Pincode" value={controller.address.pinCode} onChange={(event) => controller.setAddress({...controller.address, pinCode: event.target.value})} />

                <select value={controller.address.state} onChange={(event) => controller.setAddress({...controller.address, state: event.target.value})}>
                    {states.map(
                        (value, index, array) => {
                            return <option key={index} value={value}>{value}</option>;
                        }
                    )}
                </select>

            </div>
            
            <CouponCodeForm className={styles.coupon_code_form} />

            <button 
                disabled={controller.isConfirmAndPayButtonDisabled()} 
                className={styles.confirm_and_pay_button} 
                onClick={(event) => controller.onConfirmAndPayButtonClicked()}
            >
                CONFIRM AND PAY
            </button>
        </div>
    );
};