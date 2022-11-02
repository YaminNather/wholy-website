import classnames from "classnames";
import { CSSProperties, FC, PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./nav_bar_styles.module.scss";
import Link from "next/link";

import companyLogo from "../../public/company-logo.png";
import classNames from "classnames";
// import companyLogo from "../../public/micsys-logo-dark-theme.png";

export interface NavBarProps {
    style?: CSSProperties;
    className?: string;
}

export const NavBar: FC<PropsWithChildren<NavBarProps>> = (props) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    
    useEffect(
        () => {
            const a = () => {
                if(isVisible && window.scrollY >= 100) 
                    setIsVisible(false);
                else if(!isVisible && window.scrollY < 100) 
                    setIsVisible(true);
            };

            window.addEventListener("scroll", a);

            return () => window.removeEventListener("scroll", a);
        },
        [isVisible]
    );

    return (
        <div style={{ opacity: (isVisible) ? "1.0" : "0.0", ...props.style }} className={classNames(styles.nav_bar, props.className)}>
            <div className={classnames("container", styles.container)}>
                <Link href="/" className={styles.logo_container}>                    
                    <Image src={companyLogo} alt="Micro Systems" className={styles.logo} priority={true} />
                </Link>

                <nav>
                    {props.children}
                </nav>
            </div>
        </div>
    );
};
