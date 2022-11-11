import classNames from "classnames";
import { NextPage } from "next";
import Image from "next/image";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AppBar } from "../components/app_bar/app_bar";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import { NavMenu } from "../components/nav_menu/nav_menu";
import { OrderListItem } from "../components/orders_page/order_list_item/order_list_item";
import { DatabaseOrdersService } from "../models/database_orders_service";
import FirebaseDatabaseOrdersService from "../models/firebase_database_orders_service";
import { OrderBridge } from "../models/order_bridge";
import backgroundImage from "../public/grey-textured-background.png";
import styles from "../styles/orders_page_styles.module.scss";

export const OrdersPage: NextPage = () => {
    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;

    const [orders, setOrders] = useState<OrderBridge[]>([]);

    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    useEffect(
        () => {
            const asyncPart = async (): Promise<void> => {
                loadingIndicatorData.setIsLoading(true);
                
                const ordersDatabaseService: DatabaseOrdersService = new FirebaseDatabaseOrdersService();
                const orders: OrderBridge[] = await ordersDatabaseService.getAllOrders();
                loadingIndicatorData.setIsLoading(false);
                
                setOrders(orders);
            };

            asyncPart();
        },
        []
    );

    return (
        <>
            <AppBar isNavMenuOpen={isNavMenuOpen} onToggleNavMenuButtonPressed={(isOpen) => setIsNavMenuOpen(isOpen)} />

            <NavMenu isOpen={isNavMenuOpen} />

            <div className={styles.order_page}>

                <Image src={backgroundImage} alt="" className={"background_image"} />

                <div className={classNames("light_theme", styles.main_content_container)}>
                    <h1><u>Your Orders:</u></h1>

                    <div className={classNames(styles.orders_list_container)}>
                        {orders.map(
                            (value, index, array): ReactNode => {
                                return (
                                    <OrderListItem className={styles.order_list_item} key={index} order={value} />
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrdersPage;