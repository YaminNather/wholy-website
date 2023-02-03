import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";

import styles from "./follow_us_section_styles.module.scss";

import { instagramLogoVector } from "../../../common_imported_images/social_media_logos";
import { greenTearEffectFlippedImage, greenTearEffectImage } from "../../../common_imported_images/textured_backgrounds";

import arrowImage from "../../../public/home/follow-us/arrow.png";
import { UIProducts } from "../../../product_ui_details/ui_products";

import greenLeavesImage from "../../../public/plant-0.png";


export const FollowUsSection: FC = (props) => {
    return (
        <section id="follow_us" className={classNames("light_theme", styles.follow_us_section)}>
            <Image src={greenTearEffectFlippedImage} alt="" className={classNames("tear_effect", styles.tear_effect)} />

            <Image src={UIProducts.blueberry.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.bottom_left_blueberry)} />
            
            <Image src={UIProducts.fig.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.bottom_left_fig)} />
            
            <Image src={UIProducts.fig.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.bottom_right_fig)} />

            <Image src={greenLeavesImage} alt="" className={classNames("background_prop", styles.bottom_right_plant)} />

            <div className={classNames("container", styles.container)}>
                <div className={styles.heading_area}>
                    <h1>We dont mind you stalking us!</h1>

                    <div className={styles.instagram_handle_area}>
                        <div className={styles.logo_container}>
                            <Image src={instagramLogoVector} alt="" />
                        </div>
                        
                        <p className={styles.instagram_handle}>@insta_handle</p>
                    </div>
                </div>

                <div className={styles.cards_grid}>
                    <div className={styles.card} />
                    
                    <div className={styles.card} />
                    
                    <div className={styles.card} />
                </div>

                <div className={styles.take_a_scroll_button_container}>
                    <button className={classNames("button_yellow", styles.take_a_scroll_button)}>TAKE A SCROLL</button>

                    <Image src={arrowImage} alt="" className={styles.arrow} />
                </div>
            </div>
        </section>
    );
};