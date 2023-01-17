import { FC } from "react";
import Image from "next/image";
import styles from "./nav_bar_styles.module.scss";

import companyLogoVector from "../../../public/company-logo.svg";
import Link from "next/link";
import { Page } from "./page";
import { links } from "./links";
import classNames from "classnames";

import { Link as NavBarLink } from "./link";

export interface NavBarProps {
    highlightedLink?: Page;
    onOpenNavMenuButtonClicked?: ()=>void;
}

export const NavBar: FC<NavBarProps> = (props) => {
    return (
        <div className={styles.nav_bar}>
            <Image src={companyLogoVector} alt="" className={styles.company_logo} />

            <nav>
                {Array.from(links.keys()).map(
                    (value, index, array) => {
                        const link: NavBarLink = links.get(value)!;
                        return <Link href={link.url} className={(value === props.highlightedLink) ? styles.currently_open_page_link : undefined}>{link.uiText}</Link>;
                    }
                )}
            </nav>

            <button onClick={(event) => props.onOpenNavMenuButtonClicked?.()} className={classNames("icon_button", styles.open_nav_menu_button)}>
                *
            </button>
        </div>
    );
};

export { Page };