import classNames from "classnames";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./nav_menu_styles.module.scss";
import { links } from "../links";
import { Link as NavBarLink } from "../link";
import { useAuthState } from "../../../../hooks/common/firebase/use_auth_state";

export interface NavMenuProps {
    isOpen: boolean;
    onOpenCartButtonClicked?: ()=>void;
    onCloseButtonClicked?: ()=>void;
}

export const NavMenu: FC<NavMenuProps> = (props) => {
    const isLoggedIn: boolean = useAuthState();

    const buildIsLoggedInLinks = useCallback(
        (): ReactNode => {
            return (
                <>
                    <li><a onClick={(event) => props.onOpenCartButtonClicked?.()}>CART</a></li>
                        
                    <li><Link href="/orders">ORDERS</Link></li>

                    <li>
                        <a
                            className={styles.sign_out_link} 
                            onClick={async () => {
                                await signOut(getAuth());
                                alert("Signed out");
                            }}
                        >
                            SIGNOUT
                        </a>
                    </li>
                </>
            );
        },
        [isLoggedIn]
    );

    useEffect(
        () => {
            const authStateListenerUnsubscriber = getAuth().onAuthStateChanged(
                () => {

                }
            );

            return () => authStateListenerUnsubscriber();
        },
        []
    );

    return (
        <div className={classNames(styles.nav_menu)} style={{width: (props.isOpen) ? "100vw" : "0px" }}>
            <div className={styles.main}>
                <button className={classNames("icon_button", styles.close_button)} onClick={(event) => props.onCloseButtonClicked?.()}>
                    x
                </button>

                <nav>
                    <ul>
                        {Array.from(links.keys()).map(
                            (value, index, array) => {
                                const link: NavBarLink = links.get(value)!;
                                
                                return <li key={index}><Link href={link.url}>{link.uiText}</Link></li>;
                            }
                        )}

                        {(isLoggedIn) ? buildIsLoggedInLinks() : <></>}
                    </ul>
                </nav>
            </div>
        </div>
    );
};