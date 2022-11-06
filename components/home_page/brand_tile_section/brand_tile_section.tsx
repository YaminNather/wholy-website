import { FC } from "react";
import Image from "next/image";
import backgroundImage from "../../../public/green-textured-background.png";
import companyLogoImage from "../../../public/company-logo.png";
import wholesomeCookieBarTextImage from "../../../public/wholesome-cookie-bars-text.png";
import styles from "./brand_tile_section_styles.module.scss";
import classNames from "classnames";
import plant0Image from "../../../public/plant-0.png";

export const BrandTileSection: FC = () => {
    return (
        <section id="brand_tile" className={styles.brand_tile_section}>
            <Image src={backgroundImage} alt="" className="background_image" />

            <Image src={plant0Image} alt="" className={classNames("background_prop", styles.plant, styles.plant_0)} />
            
            <Image src={plant0Image} alt="" className={classNames("background_prop", styles.plant, styles.plant_1)} />
            
            <div className={classNames("container", styles.container)}>
                <Image src={companyLogoImage} alt="" />

                <Image src={wholesomeCookieBarTextImage} alt="" className={styles.wholesome_cookie_bars_text} />
            </div>
        </section>
    );
};