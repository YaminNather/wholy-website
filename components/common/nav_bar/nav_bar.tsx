import { FC, MouseEventHandler, ReactNode, TransitionEventHandler, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./nav_bar_styles.module.scss";

import Link from "next/link";
import { Page } from "./page";
import { links } from "./links";
import classNames from "classnames";

import { Link as NavBarLink } from "./link";

import companyLogoVector from "../../../public/company-logo.svg";
import { getAuth } from "firebase/auth";
import { useEffectClientSide } from "../../../hooks/common/use_effect_client_side";
import { AccountButton } from "./account_button/account_button";
import { useAuthState } from "../../../hooks/common/firebase/use_auth_state";

export interface NavBarProps {
    highlightedLink?: Page;
    onOpenNavMenuButtonClicked?: ()=>void;
    onOpenCartButtonClicked?: ()=>void;
    colorScheme?: ColorScheme;
}

export const NavBar: FC<NavBarProps> = (props) => {
    const colorScheme: ColorScheme = props.colorScheme ?? ColorScheme.dark;

    const isLoggedIn: boolean = useAuthState();
    const [compactState, setCompactState] = useState<CompactState>(CompactState.default);

    const onNavTransitionEnd = useCallback<TransitionEventHandler<HTMLElement>>(
        (event) => {
            if (!event.currentTarget.classList.contains(styles.detailed_section)) return;  

            const opacity: number = Number(window.getComputedStyle(event.currentTarget).opacity);
            // console.log(`CustomLog: Opacity on transitionEnd = ${opacity}`);

            if (opacity === 0.0) {
                // console.log(`Setting compactState to compact`);
                setCompactState(CompactState.compact);
            }
            else if (opacity === 1.0) {
                // console.log(`Setting compactState to default`);
                setCompactState(CompactState.default);
            }
        },
        [compactState]
    );

    const buildLinks = useCallback(
        (): ReactNode => {
            return (
                <>
                    {Array.from(links.keys()).map(
                        (value, index, array) => {
                            const link: NavBarLink = links.get(value)!;
                            return (
                                <Link 
                                    key={value} 
                                    href={link.url} 
                                    className={classNames(styles.nav_item, styles.nav_link, (value === props.highlightedLink) ? styles.currently_open_page_link : undefined)}
                                >
                                    {link.uiText}
                                </Link>
                            );
                        }
                    )}
                </>
            );
        },
        []
    );

    useEffectClientSide(
        () => {
            const scrollListener = (event: Event): any => {
                if (window.scrollY > 512) {
                    if (compactState !== CompactState.toCompact && compactState !== CompactState.compact) {
                        setCompactState(CompactState.toCompact);
                    }
                }
                else {
                    if (compactState !== CompactState.toDefault && compactState !== CompactState.default) {
                        setCompactState(CompactState.toDefault);
                    }
                }
            };

            window.addEventListener("scroll", scrollListener);

            return () => window.removeEventListener("scroll", scrollListener);
        },
        [compactState]
    );
    
    return (
        <div 
            className={classNames(
                styles.nav_bar,
                (colorScheme === ColorScheme.light) ? styles.nav_bar_light_theme : undefined,
                (compactState === CompactState.toCompact || compactState === CompactState.compact) ? styles.nav_bar_compact : undefined
            )}
        >
            <div className={styles.detailed_section} style={{ display: (compactState === CompactState.compact) ? "none" : undefined }} onTransitionEnd={onNavTransitionEnd}>
                {/* <Image src={greenTexturedBackgroundImage} alt="" className={"background_image"} /> */}

                <Image src={companyLogoVector} alt="" className={styles.company_logo} />

                <nav style={{display: (compactState !== CompactState.compact) ? undefined : "none"}}>
                    {buildLinks()}

                    <button 
                        style={{display: (isLoggedIn) ? undefined : "none"}} 
                        className={classNames(styles.nav_item, "icon_button", styles.background_icon_button)} 
                        onClick={(event) => props.onOpenCartButtonClicked?.()}
                    >
                        <span className={classNames("material-icons")}>shopping_cart</span>
                    </button>

                    <Link href="/authentication" className={styles.nav_item} style={{display: (!isLoggedIn) ? undefined : "none"}}>
                        <button className={classNames("icon_button", styles.account_button)}>
                            <span className={"material-symbols-outlined"}>account_circle</span>
                        </button>
                    </Link>

                    <AccountButton className={styles.nav_item} isLoggedIn={isLoggedIn} />
                </nav>  
            </div>

            <button
                onClick={(event) => props.onOpenNavMenuButtonClicked?.()} 
                className={classNames("icon_button", styles.open_nav_menu_button)}
            >
                <span className={"material-icons"}>menu</span>
            </button>
        </div>
    );
};

export enum ColorScheme {
    light,
    dark
}

enum CompactState {
    toDefault,
    default,
    toCompact,
    compact
}

export { Page };