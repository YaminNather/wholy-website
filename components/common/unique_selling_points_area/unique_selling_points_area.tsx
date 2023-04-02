import { CSSProperties, FC, ReactNode, useCallback } from "react";
import Image from "next/image";
import classNames from "classnames";
import { StaticImageData } from "next/image";


import styles from "./unique_selling_points_area_styles.module.scss";

import uniqueSellingPointsImage0 from "../../../public/home/unique-selling-points/0.png";
import uniqueSellingPointsImage1 from "../../../public/home/unique-selling-points/1.png";
import uniqueSellingPointsImage2 from "../../../public/home/unique-selling-points/2.png";
import uniqueSellingPointsImage3 from "../../../public/home/unique-selling-points/3.png";
import greenBoxImage from "../../../public/home/unique-selling-points/green-box.png";
import darkThemeCrossIconImage from "../../../public/yellow-cross-icon.png";
import lightThemeCrossIconImage from "../../../public/black-cross-icon.png";


const bottomTexts: string[] = [
    "Maida",
    "Refined Sugar",
    "Preservatives",
    "Trans Fat",
    "Artificial Color or Flavour"
];

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

    const buildBottomText = useCallback(
        (): ReactNode => {
            return bottomTexts.map(
                (value, index, array): ReactNode => {
                    return (
                        <span key={index} className={styles.part}>
                            <Image 
                                src={(colorScheme === ColorScheme.dark) ? darkThemeCrossIconImage : lightThemeCrossIconImage} 
                                alt=""                                 
                                className={styles.cross_icon}
                            />
                            &nbsp;No {value}
                        </span>
                    );
                }
            );
        },
        []
    );

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


            <p className={styles.bottom_text}>{buildBottomText()}</p>
            {/* <p>No Maida | No Refined Sugar | No Preservatives | No Trans Fat | No Artificial Color or Flavour</p> */}
        </div>
    );
};

export enum ColorScheme {
    dark, 
    light
}