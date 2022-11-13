import { FC } from "react";
import Image from "next/image";
import styles from "./header_section_styles.module.scss";
import classNames from "classnames";

import backgroundImage from "../../../public/products/header/background.png";
import inspireSomeoneTodayTextImage from "../../../public/products/header/inspire-someone-today-text.png";
import leavesImage from "../../../public/plant-0.png";

export const HeaderSection: FC = () => {
    return (
        <section id="header" className={styles.header_section}>
            <Image src={backgroundImage} alt="" className="background_image" />

            <Image src={leavesImage} alt="" className={classNames("background_prop", styles.leaves_0)} />
            
            <Image src={leavesImage} alt="" className={classNames("background_prop", styles.leaves_1)} />

            <div className={classNames("container", styles.container)}>
                <Image src={inspireSomeoneTodayTextImage} alt="" className={styles.inspire_someone_today} />
                
                {/* <Image src={wholesomeCookieBarsTextImage} alt="" className={styles.wholesome_cookie_bars} /> */}
            </div>
        </section>
    );
};