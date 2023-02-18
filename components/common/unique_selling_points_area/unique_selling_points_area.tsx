import { CSSProperties, FC } from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./unique_selling_points_area_styles.module.scss";

import uniqueSellingPointsImage0 from "../../../public/home/unique-selling-points/0.png";
import uniqueSellingPointsImage1 from "../../../public/home/unique-selling-points/1.png";
import uniqueSellingPointsImage2 from "../../../public/home/unique-selling-points/2.png";
import uniqueSellingPointsImage3 from "../../../public/home/unique-selling-points/3.png";
import greenBoxImage from "../../../public/home/unique-selling-points/green-box.png";
import { StaticImageData } from "next/image";

const uniqueSellingPointsImages: StaticImageData[] = [
    uniqueSellingPointsImage0,
    uniqueSellingPointsImage1,
    uniqueSellingPointsImage2,
    uniqueSellingPointsImage3
];

export interface UniqueSellingPointsAreaProps {
    colorScheme?: ColorScheme;
    style?: CSSProperties;
    className?: string;
}

export const UniqueSellingPointsArea: FC<UniqueSellingPointsAreaProps> = (props) => {
    const colorScheme = props.colorScheme ?? ColorScheme.dark;

    const themeClass: string | undefined = (colorScheme == ColorScheme.dark) ? undefined : styles.light_theme;

    return (
        <div style={props.style} className={classNames("container", styles.unique_selling_points_area, themeClass, props.className)}>
            <div className={styles.grid}>
                {uniqueSellingPointsImages.map((value, index, array) => <Image key={index} src={value} alt="" />)}
            </div>

            <div className={styles.green_box}>
                <Image src={greenBoxImage} alt="" />

                Stuff not found in your
                <span className={styles.correction_area}>
                    <span className={classNames("personalized_text", styles.correction)}>and our</span>
                    
                    <span className={classNames("personalized_text", styles.correction_indicator)}>{"^"}</span>

                    &nbsp;kitchen
                </span>
            </div>

            <p>No Maida | No Refined Sugar | No Preservatives | No Trans Fat | No Artificial Color or Flavour</p>
        </div>
    );
};

export enum ColorScheme {
    dark, 
    light
}