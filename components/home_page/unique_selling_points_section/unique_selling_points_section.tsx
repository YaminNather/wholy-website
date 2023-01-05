import { CSSProperties, FC } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./unique_selling_points_section_styles.module.scss";
import classNames from "classnames";
import { UniqueSellingPoint, UniqueSellingPointProps } from "./unique_selling_point";
import { yellowTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";
import uniqueSellingPointsImage0 from "../../../public/home/unique-selling-points/0.png";
import uniqueSellingPointsImage1 from "../../../public/home/unique-selling-points/1.png";
import uniqueSellingPointsImage2 from "../../../public/home/unique-selling-points/2.png";
import uniqueSellingPointsImage3 from "../../../public/home/unique-selling-points/3.png";
import lineImage from "../../../public/home/unique-selling-points/line.png";

const uniqueSellingPointsImages: StaticImageData[] = [
    uniqueSellingPointsImage0,
    uniqueSellingPointsImage1,
    uniqueSellingPointsImage2,
    uniqueSellingPointsImage3
];

export const UniqueSellingPointsSection: FC = (props) => {
    return (
        <section id="unique_selling_points_section" className={styles.section}>
            <Image src={yellowTexturedBackgroundImage} alt="" className={"background_image"} />

            <div className={classNames("container", styles.container)}>
                <h1>The best part is we're lip smacking and irresistably good!</h1>

                <div className={styles.grid}>
                    {uniqueSellingPoints.map((value, index, array) => <UniqueSellingPoint {...value} />)}
                </div>

                {/* <div className={styles.unique_selling_points_1_area}>
                    {uniqueSellingPointsImages.map(
                        (value, index, array) => {
                            return (
                                <>
                                    <Image src={value} alt="" className={styles.unique_selling_point_1} />

                                    <Image src={lineImage} alt="" className={styles.line} />
                                </>
                            );
                        }
                    )}
                </div> */}
            </div>
        </section>
    );
};

const uniqueSellingPoints: UniqueSellingPointProps[] = [
    {
        image: "",
        description: "Made with a blend of wholesome & nutritious flours found in your kitchen."
    },

    {
        image: "",
        description: "Packed with fiber, wholegrains, toasted nuts & seeds rich in omega 3"
    },

    {
        image: "",
        description: "We're 100% vegan."
    },

    {
        image: "",
        description: "Powered by plant protein (so no doubt there)"
    }
];