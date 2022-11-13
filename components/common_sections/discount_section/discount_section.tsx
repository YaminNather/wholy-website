import { FC } from "react";
import classNames from "classnames";
import Image, { StaticImageData } from "next/image";
import styles from "./discount_section_styles.module.scss";

import strawberryImage from "../../../public/fruits/strawberry-0.png";
import blueberryImage from "../../../public/fruits/blueberry-0.png";
import pineappleImage from "../../../public/fruits/pineapple-0.png";
import figImage from "../../../public/fruits/fig-0.png";
import Link from "next/link";

export interface DiscountSectionProps {
    titleColor?: string;
    backgroundImage: StaticImageData | string;
}

export const DiscountSection: FC<DiscountSectionProps> = (props) => {
    return (
        <section id={"discount"} className={styles.discount_section}>
            <Image src={props.backgroundImage} alt="" className="background_image" />

            <Image src={strawberryImage} alt="" className={classNames("background_prop", styles.fruit, styles.strawberry)} />
            
            <Image src={blueberryImage} alt="" className={classNames("background_prop", styles.fruit, styles.blueberry)} />
            
            <Image src={pineappleImage} alt="" className={classNames("background_prop", styles.fruit, styles.pineapple)} />
            
            <Image src={figImage} alt="" className={classNames("background_prop", styles.fruit, styles.fig)} />

            <div className="container">
                <h1 style={{color: props.titleColor}}>
                    Subscribe to our newsletter and get <strong>15% coupon code</strong> for your next order!
                </h1>

                <div className={styles.button_container}>
                    <Link href="#footer"><button className={classNames("button_yellow", styles.join_now_button)}>Join now!</button></Link>
                    
                    <button className={classNames("button_outline", styles.follow_us_button)}>Follow us</button>
                </div>
            </div>
        </section>
    );
};