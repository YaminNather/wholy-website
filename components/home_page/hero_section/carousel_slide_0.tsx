import { FC } from "react";
import Image from "next/image";
import styles from "./carousel_slide_0_styles.module.scss";
import { greenPlant1Image } from "../../../common_imported_images/plants";
import classNames from "classnames";
import { greenTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";
import commonCarouselSlideStyles from "./common_carousel_slide_styles.module.scss";
import { yellowCurvesImages } from "../../../common_imported_images/curves";
import { UIProducts } from "../../../product_ui_details/ui_products";

export const CarouselSlide0: FC = (props) => {
    return (
        <div className={classNames(commonCarouselSlideStyles.carousel_slide, styles.carousel_slide_0)}>
            <Image src={greenTexturedBackgroundImage} alt="" className="background_image" priority={true} />

            <Image src={UIProducts.pineapple.fruits[0]} alt="" className={classNames("background_prop", styles.pineapple_0)} />

            <Image src={UIProducts.pineapple.fruits[0]} alt="" className={classNames("background_prop", styles.pineapple_1)} />

            <Image src={UIProducts.strawberry.fruits[0]} alt="" className={classNames("background_prop", styles.strawberry_0)} />

            <Image src={UIProducts.fig.fruits[0]} alt="" className={classNames("background_prop", styles.fig_0)} />

            <Image src={UIProducts.fig.fruits[1]} alt="" className={classNames("background_prop", styles.fig_1)} />

            <Image src={UIProducts.blueberry.fruits[1]} alt="" className={classNames("background_prop", styles.blueberry_0)} />

            <Image src={UIProducts.strawberry.fruits[1]} alt="" className={classNames("background_prop", styles.strawberry_1)} />

            <Image src={UIProducts.blueberry.fruits[0]} alt="" className={classNames("background_prop", styles.blueberry_1)} />

            <Image src={greenPlant1Image} alt="" className={classNames("background_prop", styles.plant)} />

            <Image src={yellowCurvesImages[1]} alt="" className={classNames("background_prop", styles.yellow_curve_0)} priority={true} />
            
            <Image src={yellowCurvesImages[0]} alt="" className={classNames("background_prop", styles.yellow_curve_1)} priority={true} />

            <div className={classNames("container", styles.container)}>
                <video className={styles.video} autoPlay={true} muted={true} loop={true}>
                    <source src="https://firebasestorage.googleapis.com/v0/b/wholy-website.appspot.com/o/brand-video.mp4?alt=media&token=7ad4fbb6-9296-4463-b6db-862fbc773bb0" type="video/mp4" />
                </video>
            </div>
        </div>
    );
};