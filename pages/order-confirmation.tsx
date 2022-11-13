import { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/order_confirmation_page_styles.module.scss"; 
import classNames from "classnames";
import Link from "next/link";

import backgroundImage from "../public/red-textured-background.png";
import handsImage from "../public/order-confirmation/hands.png";
import badgeImage from "../public/order-confirmation/badge.png";
import cookieImage from "../public/order-confirmation/strawberry-cookie.png";
import leavesImage from "../public/order-confirmation/leaves.png";

import strawberryImage from "../public/fruits/strawberry-0.png";
import blueberryImage from "../public/fruits/blueberry-0.png";
import figImage from "../public/fruits/fig-0.png";

export const OrderConfirmationPage: NextPage = () => {
    return (
        <div className={styles.order_confirmation_page}>
            <Image src={backgroundImage} alt="" className={classNames("background_image", styles.background_image)} />

            <Image src={handsImage} alt="" className={classNames("background_prop", styles.background_hands)} />
            
            <Image src={badgeImage} alt="" className={classNames(styles.badge)} />
            
            <Image src={cookieImage} alt="" className={classNames(styles.strawberry_cookie)} />
                        
            <Image src={leavesImage} alt="" className={classNames(styles.leaves)} />
            
            <Image src={strawberryImage} alt="" className={classNames(styles.fruit, styles.strawberry)} />
            
            <Image src={blueberryImage} alt="" className={classNames(styles.fruit, styles.blueberry)} />
            
            <Image src={figImage} alt="" className={classNames(styles.fruit, styles.fig)} />

            <div className={classNames("light_theme", styles.main_content_container)}>
                <h1>Congratulations, your order has been placed.</h1>
                
                <p className={styles.main_text}>
                    Do take a look outside your window now and then, it should arrive shortly.
                    <br />Or you could track your order here.
                </p>                                

                <button className="button_outline">TRACK YOUR ORDER HERE</button>

                <p className={styles.secondary_text}>Or dont, we cant tell you what to do!</p>

                <Link href="/">{"<"} HOME PAGE</Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;