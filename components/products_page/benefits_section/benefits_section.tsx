import classNames from "classnames";
import { FC } from "react";
import Image from "next/image";
import styles from "./benefits_section_styles.module.scss";

import backgroundImage from "../../../public/grey-textured-background.png";

import uniqueSellingPoint0Image from "../../../public/products/benefits/unique-selling-points/0.png";
import uniqueSellingPoint1Image from "../../../public/products/benefits/unique-selling-points/1.png";
import uniqueSellingPoint2Image from "../../../public/products/benefits/unique-selling-points/2.png";
import uniqueSellingPoint3Image from "../../../public/products/benefits/unique-selling-points/3.png";

export const BenefitsSection: FC = () => {
    return (
        <section id="benefits" className={classNames("light_theme", styles.benefits_section)}>
            <Image src={backgroundImage} alt="" className="background_image" />

            <div className={classNames("container", styles.container)}>
                <div className={styles.main_unique_selling_points_grid}>
                    <Image src={uniqueSellingPoint0Image} alt="" />
                    
                    <Image src={uniqueSellingPoint1Image} alt="" />
                    
                    <Image src={uniqueSellingPoint2Image} alt="" />
                    
                    <Image src={uniqueSellingPoint3Image} alt="" />
                </div>

                <p>No Maida | No Refined Sugar | No Preservatives | No Trans Fat | No Artificial Colour or Flavour</p>
            </div>
        </section>
    );
};