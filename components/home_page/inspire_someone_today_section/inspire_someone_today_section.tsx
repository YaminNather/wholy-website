import { FC } from "react";
import Image from "next/image";
import styles from "./inspire_someone_today_section_styles.module.scss";

import backgroundImage from "../../../public/yellow-textured-background.jpeg";
import paintStrokesImage from "../../../public/home/paint-strokes.png";
import classNames from "classnames";

export const InspireSomeoneTodaySection: FC = () => {
    return (
        <section id="hero-section" className={styles.inspire_someone_today_section}>
            <Image src={backgroundImage} alt={""} className="background_image" />
            
            <div className={classNames("container", styles.container)}>
                <p><b>Go On. Inspire someone</b></p>
                
                <div className={styles.bottom_area}>
                    <Image src={paintStrokesImage} alt="" className={styles.paint_strokes} />
                    
                    today
                </div>
            </div>
        </section>
    );
};