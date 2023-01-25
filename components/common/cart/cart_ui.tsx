import { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartController, CartControllerContext } from "./cart_controller";

import styles from "./cart_ui_styles.module.scss";
import classNames from "classnames";
import { CartItemsArea } from "./checkout_section/cart_items_list/cart_items_area";
import { TotalPriceArea as TotalPriceInfoArea } from "./checkout_section/total_price_info_area/total_price_info_area";
import { CouponCodeForm } from "./coupon_code_form/coupon_code_form";
import { CustomerInfoArea } from "./customer_info_area/customer_info_area";
import { ShippingAddressArea } from "./shipping_address_area/shipping_address_area";

import closeVector from "../../../public/common_icons/close.svg";
import { LoadingIndicatorModal } from "../../loading_indicator_modal/loading_indicator_modal";
import { AddMoreArea } from "./add_more_area/add_more_area";

export const CartUI: FC = (props) => {
    const controller: CartController = useContext(CartControllerContext)!;

    useEffect(
        () => {
            controller.onCreated();
        },
        []
    );

    if (controller === null) throw Error();

    if(!controller.pulledFromDatabase) return <></>;

    return (
        <div style={{display: (controller.isOpen) ? undefined : "none"}} className={classNames(styles.cart_container)}>
            <LoadingIndicatorModal isVisible={controller.isLoading} />
            
            <div style={{overflowY: (controller.isLoading) ? "hidden" : undefined}} className={classNames("light_theme", styles.cart)}>

                <div className={styles.tool_bar}>
                    <h1>Your Cart</h1>

                    <button 
                        className={classNames("icon_button", styles.close_button)}
                        onClick={(event) => controller.onCloseButtonClicked()}
                    >
                        <Image src={closeVector} alt="" />
                    </button>
                </div>

                <div className={styles.area}>
                    <CartItemsArea />

                    <CouponCodeForm className={styles.coupon_code_form} />

                    <TotalPriceInfoArea className={styles.total_price_info_area} details={controller.totalPriceInfoAreaDetails} />
                </div>
                
                <AddMoreArea className={classNames(styles.area, styles.add_more_area)} />

                <div className={classNames(styles.area)}>
                    <CustomerInfoArea className={styles.customer_info_accordion} />

                    <ShippingAddressArea className={styles.shiping_address_accordion} />

                    <button 
                        className={styles.place_order_button}
                        disabled={controller.isPlaceOrderButtonDisabled}
                        onClick={(event) => controller.onPlaceOrderButtonClicked()}
                    >
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </div>
    );
};