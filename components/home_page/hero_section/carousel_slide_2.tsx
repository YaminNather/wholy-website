import { FC } from "react";
import Image from "next/image";
import styles from "./carousel_slide_2_styles.module.scss";
import { blueberryImages, figImages, pineappleImages, strawberryImages } from "../../../common_imported_images/fruits";
import { greenPlant1Image } from "../../../common_imported_images/plants";
import classNames from "classnames";
import { greenTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";
import commonCarouselSlideStyles from "./common_carousel_slide_styles.module.scss";

export const CarouselSlide2: FC = (props) => {
    return (
        <div className={classNames(commonCarouselSlideStyles.carousel_slide, styles.carousel_slide_2)}>
            <Image src={greenTexturedBackgroundImage} alt="" className="background_image" />

            {/* <Image src={pineappleImages[0]} alt="" className={classNames("background_prop", styles.pineapple_0)} />

            <Image src={pineappleImages[0]} alt="" className={classNames("background_prop", styles.pineapple_1)} />

            <Image src={strawberryImages[0]} alt="" className={classNames("background_prop", styles.strawberry_0)} />

            <Image src={figImages[0]} alt="" className={classNames("background_prop", styles.fig_0)} /> */}

            <Image src={figImages[1]} alt="" className={classNames("background_prop", styles.fig_1)} />

            <Image src={blueberryImages[1]} alt="" className={classNames("background_prop", styles.blueberry_0)} />

            <Image src={strawberryImages[1]} alt="" className={classNames("background_prop", styles.strawberry_1)} />

            <Image src={blueberryImages[0]} alt="" className={classNames("background_prop", styles.blueberry_1)} />

            <Image src={greenPlant1Image} alt="" className={classNames("background_prop", styles.plant)} />

            <div className={classNames(styles.container)}>
                <div className={styles.left_grid_cell}>
                    <h1 className={styles.title}>Grab a bite!</h1>
                    
                    <h1 className={styles.subtitle}>A cookie, a treat, a energy reboost!</h1>

                    <p className={"personalized_text"}>Oh! And did we mention that we're <strong>Vegan, Wholesome, & Natural</strong> and baked with stuff found in your kitchen</p>

                    <button className="button_yellow">OUR STORY</button>
                </div>

                <div className={styles.right_grid_cell}>
                    <div className={styles.image} />
                </div>
            </div>
        </div>
    );
};