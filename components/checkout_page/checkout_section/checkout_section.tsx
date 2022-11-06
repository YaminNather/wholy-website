import classNames from "classnames";
import { FC, useState } from "react";
import styles from "./checkout_section_styles.module.scss";
import { Accordion } from "../../accordion/accordion";
import { Header } from "../../accordion/header";
import { Content } from "../../accordion/content";
import { CartItemsList } from "./cart_items_list/cart_items_list";

export const CheckoutSection: FC = (props) => {
    const [isCustomerInfoAreaOpened, setIsCustomerInfoAreaOpened] = useState<boolean>(false);
    const [isShippingAddressAreaOpened, setIsShippingAddressAreaOpened] = useState<boolean>(false);

    const [fullName, setFullName] = useState<string>("");
    const [streetAddress0, setStreetAddress0] = useState<string>("");
    const [streetAddress1, setStreetAddress1] = useState<string>("");

    const [city, setCity] = useState<string>("");

    return (
        <section className={styles.checkout_section}>
            {/* <Image src={backgroundImage} alt="" className={"background_image"} /> */}

            <div className={classNames("container", "light_theme", styles.container)}>
                <CartItemsList />

                <div className={styles.checkout_form}>
                    <Accordion className={styles.accordion} isExpanded={isCustomerInfoAreaOpened}>
                        <Header onToggled={(isExpanded) => setIsCustomerInfoAreaOpened(isExpanded)}>
                            <h1>Customer Info</h1>
                        </Header>

                        <Content>
                            <div className={styles.input_field_container}>
                                <label>Email *</label>
                                
                                <input />
                            </div>
                        </Content>
                    </Accordion>

                    <Accordion className={classNames(styles.form_area, styles.shipping_address_accordion)} isExpanded={isShippingAddressAreaOpened}>
                        <Header onToggled={(isExpanded) => setIsShippingAddressAreaOpened(isExpanded)}>
                            <h1>Shipping Address</h1>
                        </Header>

                        <Content>
                            <div className={styles.input_field_container}>
                                <label>Full Name *</label>
                                
                                <input />
                            </div>
                            
                            <div className={styles.input_field_container}>
                                <label>Street Address *</label>
                                
                                <input />

                                <input />
                            </div>                            
                            
                            <div className={styles.input_field_container}>
                                <label>City *</label>
                                
                                <input />
                            </div>
                            
                            <div className={styles.input_field_container}>
                                <label>State/Province</label>
                                
                                <input />
                            </div>
                            
                            <div className={styles.input_field_container}>
                                <label>Zip/Postal Code *</label>
                                
                                <input />
                            </div>
                            
                            <div className={styles.input_field_container}>
                                <label>Country *</label>
                                
                                <input />
                            </div>
                        </Content>
                    </Accordion>

                    <ul className={styles.shipping_options_area}>
                        <li>
                            <input type="radio" name="payment_options" className={styles.area} />
                            
                            <div className={classNames(styles.area, styles.description)}>
                                <strong>Flat-Rate</strong>

                                <p>Standard flat rate for all shipments.</p>
                            </div>

                            <p className={styles.area}>Rs. 18.90</p>
                        </li>

                        <li>
                            <input type="radio" name="payment_options" className={styles.area} />
                            
                            <div className={classNames(styles.area, styles.description)}>
                                <strong>Expedited Shipping</strong>

                                <p>Expedited Shipping to get the shipment in a day or two</p>
                            </div>

                            <p className={styles.area}>Rs. 24.70</p>
                        </li>

                        <li>
                            <input type="radio" name="payment_options" className={styles.area} />
                            
                            <div className={classNames(styles.area, styles.description)}>
                                <strong>Overnight shipping</strong>

                                <p>An expensive option to get the shipment on the next business day.</p>
                            </div>

                            <p className={styles.area}>Rs. 13.65</p>
                        </li>
                    </ul>

                    <button className={styles.place_order_button}>PLACE ORDER</button>
                </div>
            </div>
        </section>
    );
};