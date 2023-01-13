import { FC } from "react";
import Image from "next/image";
import styles from "./nav_bar_styles.module.scss";

import companyLogoVector from "../../../public/company-logo.svg";
import Link from "next/link";
import { NavBarLink } from "./nav_bar_link";

export interface NavBarProps {
    highlightedLink?: NavBarLink;
}

export const NavBar: FC<NavBarProps> = (props) => {
    return (
        <div className={styles.nav_bar}>
            <Image src={companyLogoVector} alt="" className={styles.company_logo} />

            <nav>
                {Array.from(navBarLinkEnumToText.keys()).map(
                    (value, index, array) => {
                        return <Link href="" className={(value === props.highlightedLink) ? styles.currently_open_page_link : undefined}>{navBarLinkEnumToText.get(value)}</Link>;
                    }
                )}                
            </nav>
        </div>
    );
};

const navBarLinkEnumToText: Map<NavBarLink, string> = new Map<NavBarLink, string>(
    [
        [NavBarLink.home, "HOME"],
        [NavBarLink.shop, "SHOP"],
        [NavBarLink.ourStory, "OUR STORY"],
        [NavBarLink.products, "PRODUCTS"],
        [NavBarLink.contact, "CONTACT"],
    ]
);