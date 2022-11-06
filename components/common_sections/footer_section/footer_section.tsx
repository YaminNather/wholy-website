import { FC } from "react";
import Image from "next/image";
import styles from "./footer_section_styles.module.scss";
import classNames from "classnames";
import Link from "next/link";

import backgroundImage from "../../../public/green-textured-background.png";
import tearEffectImage from "../../../public/green-tear-effect.png";
import companyLogoImage from "../../../public/company-logo.png";

import facebookLogoVector from "../../../public/social-media-logos/facebook.svg";
import instagramLogoVector from "../../../public/social-media-logos/instagram.svg";

export const FooterSection: FC = (props) => {
    return (
        <section id="footer" className={styles.footer_section}>
            <Image src={backgroundImage} alt="" className={"background_image"} />

            <div className={styles.container}>
                <div className={classNames(styles.grid_cell, styles.first_grid_cell)}>
                    <Image src={companyLogoImage} alt="" />
                        
                    <div className={styles.address_container}>
                        <p>Address Line 1,</p>
                        
                        <p>Address Line 2,</p>
                        
                        <p>Address Line 3</p>
                    </div>
                </div>

                <div className={classNames(styles.grid_cell, styles.second_grid_cell)}>
                    <div className={styles.input_area}>
                        <input placeholder="Email" />
                        
                        <button className={classNames("button_outline")}>SUBMIT</button>
                    </div>

                    <div className={styles.bottom_area}>
                        <p>T{"&"}C</p>
                        
                        <p>PRIVACY POLICY</p>
                        
                        <p>ALL RIGHTS RESERVED, EARLYBIRD FOOD AG, 2017</p>
                    </div>
                </div>

                <div className={classNames(styles.grid_cell, styles.third_grid_cell)}>
                    <Link href=""><Image src={facebookLogoVector} alt="" /></Link>
                    
                    <Link href=""><Image src={instagramLogoVector} alt="" /></Link>
                </div>
            </div>

            <Image src={tearEffectImage} alt="" className={classNames("tear_effect", styles.tear_effect)} />
        </section>
    );
};