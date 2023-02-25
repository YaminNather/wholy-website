import { FC } from "react";
import Image from "next/image";
import styles from "./carousel_slide_0_styles.module.scss";
import { blueberryImages, figImages, pineappleImages, strawberryImages } from "../../../common_imported_images/fruits";
import { greenPlant1Image } from "../../../common_imported_images/plants";
import classNames from "classnames";
import { greenTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";
import commonCarouselSlideStyles from "./common_carousel_slide_styles.module.scss";
import { yellowCurvesImages } from "../../../common_imported_images/curves";

export const CarouselSlide0: FC = (props) => {
    return (
        <div className={classNames(commonCarouselSlideStyles.carousel_slide, styles.carousel_slide_0)}>
            <Image src={greenTexturedBackgroundImage} alt="" className="background_image" />

            <Image src={pineappleImages[0]} alt="" className={classNames("background_prop", styles.pineapple_0)} />

            <Image src={pineappleImages[0]} alt="" className={classNames("background_prop", styles.pineapple_1)} />

            <Image src={strawberryImages[0]} alt="" className={classNames("background_prop", styles.strawberry_0)} />

            <Image src={figImages[0]} alt="" className={classNames("background_prop", styles.fig_0)} />

            <Image src={figImages[1]} alt="" className={classNames("background_prop", styles.fig_1)} />

            <Image src={blueberryImages[1]} alt="" className={classNames("background_prop", styles.blueberry_0)} />

            <Image src={strawberryImages[1]} alt="" className={classNames("background_prop", styles.strawberry_1)} />

            <Image src={blueberryImages[0]} alt="" className={classNames("background_prop", styles.blueberry_1)} />

            <Image src={greenPlant1Image} alt="" className={classNames("background_prop", styles.plant)} />

            <Image src={yellowCurvesImages[1]} alt="" className={classNames("background_prop", styles.yellow_curve_0)} />
            
            <Image src={yellowCurvesImages[0]} alt="" className={classNames("background_prop", styles.yellow_curve_1)} />

            <div className={classNames("container", styles.container)}>
                <video className={styles.video} autoPlay={true} muted={true} loop={true}>
                    <source src="https://firebasestorage.googleapis.com/v0/b/wholy-46a83.appspot.com/o/brand-video.mp4?alt=media&token=f6c440d2-b206-497a-8b60-2a765d46886d" type="video/mp4" />
                </video>
            </div>
        </div>
    );
};