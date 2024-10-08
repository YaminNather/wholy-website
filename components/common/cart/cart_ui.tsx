import { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartController, CartControllerContext } from "./cart_controller";

import styles from "./cart_ui_styles.module.scss";
import classNames from "classnames";
import { CartItemsArea } from "./checkout_section/cart_items_list/cart_items_area";

import closeVector from "../../../public/common_icons/close.svg";
import { LoadingIndicatorModal } from "../../loading_indicator_modal/loading_indicator_modal";
import { AddMoreArea } from "./add_more_area/add_more_area";
import Head from "next/head";

export const CartUI: FC = (props) => {
    const controller: CartController = useContext(CartControllerContext)!;

    useEffect(
        () => {
            controller.onCreated();
        },
        []
    );

    if (controller === null) throw Error();

    return (
        <>
            <div style={{display: (controller.isOpen) ? undefined : "none"}} className={classNames(styles.cart_container)}>
                <LoadingIndicatorModal isVisible={controller.isLoading} />
                
                <div style={{overflowY: (controller.isLoading) ? "hidden" : undefined}} className={classNames("light_theme", styles.cart)}>

                    <div className={styles.tool_bar}>
                        <button 
                            className={classNames("icon_button", styles.close_button)}
                            onClick={(event) => controller.onCloseButtonClicked()}
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        
                        <h1>Your Cart <span style={{fontWeight: "400"}}>({controller.cartItems.length} Items)</span></h1>                        
                    </div>

                    <div className={styles.area}>
                        <CartItemsArea />

                        <div className={styles.detail_container}>
                            <p className={classNames(styles.name, styles.heading)}>Order Total</p>

                            <p className={styles.value}>&#x20B9; {controller.price}</p>
                        </div>

                        <hr />
                    </div>
                    
                    <AddMoreArea className={classNames(styles.area, styles.add_more_area)} />

                    <div className={classNames(styles.area)}>

                        <button 
                            className={classNames("button_yellow", styles.place_order_button)}
                            disabled={controller.isPlaceOrderButtonDisabled()}
                            onClick={(event) => controller.onPlaceOrderButtonClicked()}
                        >
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};