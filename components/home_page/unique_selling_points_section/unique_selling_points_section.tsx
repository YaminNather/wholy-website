import { CSSProperties, FC } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./unique_selling_points_section_styles.module.scss";
import classNames from "classnames";
import { yellowTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";
import uniqueSellingPointsImage0 from "../../../public/home/unique-selling-points/0.png";
import uniqueSellingPointsImage1 from "../../../public/home/unique-selling-points/1.png";
import uniqueSellingPointsImage2 from "../../../public/home/unique-selling-points/2.png";
import uniqueSellingPointsImage3 from "../../../public/home/unique-selling-points/3.png";
import greenBoxImage from "../../../public/home/unique-selling-points/green-box.png";

const uniqueSellingPointsImages: StaticImageData[] = [
    uniqueSellingPointsImage0,
    uniqueSellingPointsImage1,
    uniqueSellingPointsImage2,
    uniqueSellingPointsImage3
];

export const UniqueSellingPointsSection: FC = (props) => {
    return (
        <section id="unique_selling_points_section" className={classNames("light_theme", styles.section)}>
            <Image src={yellowTexturedBackgroundImage} alt="" className={"background_image"} />

            <div className={classNames("container", styles.container)}>
                <h1>Baked with real stuff found in your kitchen!</h1>

                <hr />

                <div className={styles.grid}>
                    {uniqueSellingPointsImages.map((value, index, array) => <Image src={value} alt="" />)}
                </div>

                <div className={styles.green_box}>
                    <Image src={greenBoxImage} alt="" />

                    Stuff not found in your kitchen
                </div>

                <p>No Maida | No Refined Sugar | No Preservatives | No Trans Fat | No Artificial Color or Flavour</p>
            </div>
        </section>
    );
};