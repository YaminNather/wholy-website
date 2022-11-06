import classNames from "classnames";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { AppBar } from "../components/app_bar/app_bar";
import { NavMenu } from "../components/nav_menu/nav_menu";
import { OrderListItem } from "../components/orders_page/order_list_item/order_list_item";
import backgroundImage from "../public/grey-textured-background.png";
import styles from "../styles/orders_page_styles.module.scss";

export const OrdersPage: NextPage = () => {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    return (
        <>
            <AppBar isNavMenuOpen={isNavMenuOpen} onToggleNavMenuButtonPressed={(isOpen) => setIsNavMenuOpen(isOpen)} />

            <NavMenu isOpen={isNavMenuOpen} />

            <div className={styles.order_page}>

                <Image src={backgroundImage} alt="" className={"background_image"} />

                <div className={classNames("light_theme", styles.main_content_container)}>
                    <h1><u>Your Orders:</u></h1>

                    <div className={classNames(styles.orders_list_container)}>
                        <OrderListItem className={styles.order_list_item} />
                        
                        <OrderListItem className={styles.order_list_item} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrdersPage;