import { FC, useContext, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "./checkout_section_styles.module.scss";
import { Accordion } from "../../accordion/accordion";
import { Header } from "../../accordion/header";
import { Content } from "../../accordion/content";
import { CartItemsArea } from "./cart_items_list/carrt_items_area";
import { TotalPriceArea as TotalPriceInfoArea, TotalPriceInfoAreaDetails } from "./total_price_info_area/total_price_info_area";

import { CheckoutPageController, CheckoutPageControllerContext } from "../checkout_page_controller";
import { YellowUnderline } from "../../text_highlighters/underline/underline";

export interface CheckoutSectionProps {
    fullName: string;
    onFullNameChanged: (newFullName: string)=>void;
    phone: string;
    onPhoneChanged: (newEmail: string)=>void;
    email: string;
    onEmailChanged: (newEmail: string)=>void;
    address: CheckoutSectionAddress;
    onAddressChanged: (newAddress: CheckoutSectionAddress)=>void;
    couponCode: string;
    onCouponCodeChanged: (newCouponCode: string)=>void;
    onClickPlaceOrderButton: ()=>void;
    // shippingMethod: ShippingMethod;
    // onShippingMethodChanged: (newShippingMethod: ShippingMethod)=>void;

    totalPriceInfoAreaDetails: TotalPriceInfoAreaDetails;
}

export const CheckoutSection: FC<CheckoutSectionProps> = (props) => {
    const pageData: CheckoutPageController = useContext(CheckoutPageControllerContext)!;

    const [isCustomerInfoAreaOpened, setIsCustomerInfoAreaOpened] = useState<boolean>(false);
    const [isShippingAddressAreaOpened, setIsShippingAddressAreaOpened] = useState<boolean>(false);

    const isButtonDisabled = (): boolean => {        
        if(pageData.cartItems.length === 0) return true;
        
        if(props.email.length === 0) return true;
        
        if(props.fullName.length === 0) return true;
        
        if(props.address.streetAddress0.length === 0) return true;
        
        if(props.address.city.length === 0) return true;
        
        if(props.address.state.length === 0) return true;
        
        if(props.address.postalCode.length === 0) return true;
        
        return false;
    };

    return (
        <section className={styles.checkout_section}>
            {/* <Image src={backgroundImage} alt="" className={"background_image"} /> */}

            <div className={classNames("container", "light_theme", styles.container)}>
                <div className={styles.area}>
                    <CartItemsArea />

                    <div className={classNames("dark_theme", styles.coupon_code_container)}>
                        <p className={"personalized_text"}><YellowUnderline>Got a coupon?</YellowUnderline></p>

                        <div className={styles.input_field_area}>
                            <input placeholder="Enter Coupon Code" value={props.couponCode} onChange={(event) => props.onCouponCodeChanged(event.target.value)} />

                            <button onClick={(event) => pageData.onApplyCouponCodeButtonClicked()} className={"button_yellow"}>APPLY</button>
                        </div>
                    </div>

                    <hr />

                    <TotalPriceInfoArea className={styles.total_price_info_area} details={props.totalPriceInfoAreaDetails} />
                </div>

                <div className={classNames(styles.area, styles.checkout_form)}>
                    <Accordion className={styles.accordion} isExpanded={isCustomerInfoAreaOpened}>
                        <Header onToggled={(isExpanded) => setIsCustomerInfoAreaOpened(isExpanded)}>
                            <h6>Customer Info</h6>
                        </Header>

                        <Content>
                            <div className={styles.input_field_container}>
                                <label>Email *</label>
                                
                                <input value={props.email} onChange={(event) => props.onEmailChanged(event.target.value)} />
                            </div>
                            
                            <div className={styles.input_field_container}>
                                <label>Phone Number *</label>
                                
                                <input value={props.phone} onChange={(event) => props.onPhoneChanged(event.target.value)} />
                            </div>
                        </Content>
                    </Accordion>

                    <Accordion className={classNames(styles.form_area, styles.shipping_address_accordion)} isExpanded={isShippingAddressAreaOpened}>
                        <Header onToggled={(isExpanded) => setIsShippingAddressAreaOpened(isExpanded)}>
                            <h6>Shipping Address</h6>
                        </Header>

                        <Content>
                            <div className={styles.input_field_container}>
                                <label>Full Name *</label>
                                
                                <input 
                                    value={props.fullName}
                                    onChange={(event) => props.onFullNameChanged(event.target.value)} 
                                />
                            </div>
                            
                            <div className={styles.input_field_container}>
                                <label>Street Address *</label>
                                
                                <input 
                                    value={props.address.streetAddress0} 
                                    onChange={(event) => props.onAddressChanged?.({...props.address, streetAddress0: event.target.value})} 
                                />

                                <input 
                                    value={props.address.streetAddress1} 
                                    onChange={(event) => props.onAddressChanged?.({...props.address, streetAddress1: event.target.value})} 
                                />
                            </div>                            
                            
                            <div className={styles.input_field_container}>
                                <label>City *</label>
                                
                                <input 
                                    value={props.address.city} 
                                    onChange={(event) => props.onAddressChanged?.({...props.address, city: event.target.value})} 
                                />
                            </div>
                            
                            <div className={styles.input_field_container}>
                                <label>State/Province</label>
                                
                                <input 
                                    value={props.address.state} 
                                    onChange={(event) => props.onAddressChanged?.({...props.address, state: event.target.value})} 
                                />
                            </div>
                            
                            <div className={styles.input_field_container}>
                                <label>Zip/Postal Code *</label>
                                
                                <input 
                                    value={props.address.postalCode} 
                                    onChange={(event) => props.onAddressChanged?.({...props.address, postalCode: event.target.value})} 
                                />
                            </div>
                        </Content>
                    </Accordion>

                    {/* <ul className={styles.shipping_options_area}>
                        <li>
                            <input 
                                type="radio" 
                                className={styles.area} 
                                value={ShippingMethod.flatRate}
                                checked={pageData.checkout.shippingMethod === ShippingMethod.flatRate}
                                onChange={(event) => pageData.checkout.shippingMethod = event.target.value as ShippingMethod} 
                            />
                            
                            <div className={classNames(styles.area, styles.description)}>
                                <strong>Flat-Rate</strong>

                                <p>Standard flat rate for all shipments.</p>
                            </div>

                            <p className={styles.area}>Rs. 18.90</p>
                        </li>

                        <li>
                            <input 
                                type="radio"
                                className={styles.area} 
                                value={"expeditedShipping"} 
                                checked={pageData.checkout.shippingMethod === "expeditedShipping"} 
                                onChange={(event) => pageData.checkout.shippingMethod = event.target.value as ShippingMethod} 
                            />
                            
                            <div className={classNames(styles.area, styles.description)}>
                                <strong>Expedited Shipping</strong>

                                <p>Expedited Shipping to get the shipment in a day or two</p>
                            </div>

                            <p className={styles.area}>Rs. 24.70</p>
                        </li>

                        <li>
                            <input 
                                type="radio" 
                                className={styles.area} 
                                value={"overnightShipping"} 
                                checked={pageData.checkout.shippingMethod === "overnightShipping"} 
                                onChange={(event) => pageData.checkout.shippingMethod =event.target.value as ShippingMethod} 
                            />
                            
                            <div className={classNames(styles.area, styles.description)}>
                                <strong>Overnight shipping</strong>

                                <p>An expensive option to get the shipment on the next business day.</p>
                            </div>

                            <p className={styles.area}>Rs. 13.65</p>
                        </li>
                    </ul> */}

                    <button 
                        className={styles.place_order_button}
                        disabled={isButtonDisabled()}
                        onClick={(event) => props.onClickPlaceOrderButton()}
                    >
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </section>
    );
};

export interface CheckoutSectionAddress {
    streetAddress0: string;
    streetAddress1: string;
    city: string;
    state: string;
    postalCode: string;
}

export type CouponCode = "abc" | "123";