import { FC } from "react";
import Image from "next/image";
import styles from "./nav_bar_styles.module.scss";

import companyLogoVector from "../../../public/company-logo.svg";
import Link from "next/link";

export const NavBar: FC = (props) => {
    return (
        <div className={styles.nav_bar}>
            <Image src={companyLogoVector} alt="" className={styles.company_logo} />

            <nav>
                <Link href="">SHOP ALL</Link>
                
                <Link href="">OUR STORY</Link>
                
                <Link href="">PRODUCTS</Link>
                
                <Link href="">CONTACT</Link>
            </nav>
        </div>
    );
};