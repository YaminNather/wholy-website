import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";

import styles from "./follow_us_section_styles.module.scss";

import { instagramLogoVector } from "../../../common_imported_images/social_media_logos";
import { greenTearEffectImage } from "../../../common_imported_images/textured_backgrounds";

export const FollowUsSection: FC = (props) => {
    return (
        <section id="follow_us" className={classNames("light_theme", styles.follow_us_section)}>
            <Image src={greenTearEffectImage} alt="" className={classNames("tear_effect", styles.tear_effect)} />

            <div className={classNames("container", styles.container)}>
                <div className={styles.heading_area}>
                    <h1>We dont mind you stalking us!</h1>

                    <div className={styles.instagram_handle_area}>
                        <div className={styles.logo_container}>
                            <Image src={instagramLogoVector} alt="" />
                        </div>
                        
                        <p className={styles.instagram_handle}>@insta_handle</p>
                    </div>
                </div>

                <div className={styles.cards_grid}>
                    <div className={styles.card} />
                    
                    <div className={styles.card} />
                    
                    <div className={styles.card} />
                </div>
            </div>
        </section>
    );
};