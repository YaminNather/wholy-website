import { FC } from "react";
import Image from "next/image";
import styles from "./header_section_styles.module.scss";
import backgroundImage from "../../../public/products/header/background.png";
import inspireSomeoneTodayTextImage from "../../../public/products/header/inspire-someone-today-text.png";
import wholesomeCookieBarsTextImage from "../../../public/wholesome-cookie-bars-text.png";
import classNames from "classnames";

export const HeaderSection: FC = () => {
    return (
        <section id="header" className={styles.header_section}>
            <Image src={backgroundImage} alt="" className="background_image" />

            <div className={classNames("container", styles.container)}>
                <Image src={inspireSomeoneTodayTextImage} alt="" className={styles.inspire_someone_today} />
                
                <Image src={wholesomeCookieBarsTextImage} alt="" className={styles.wholesome_cookie_bars} />
            </div>
        </section>
    );
};