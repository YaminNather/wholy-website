import classNames from "classnames";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { FC, ReactNode, useCallback, useState } from "react";
import styles from "./nav_menu_styles.module.scss";
import { links } from "../links";
import { Link as NavBarLink } from "../link";

export interface NavMenuProps {
    isOpen: boolean;
    onCloseButtonClicked?: ()=>void;
}

export const NavMenu: FC<NavMenuProps> = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const buildIsLoggedInLinks = useCallback(
        (): ReactNode => {
            return (
                <>
                    <li><Link href="/checkout">Checkout</Link></li>
                        
                    <li><Link href="/orders">Orders</Link></li>

                    <li>
                        <a
                            className={styles.sign_out_link} 
                            onClick={async () => {
                                console.log(`CustomLog: Signing out`);
                                await signOut(getAuth());
                                console.log(`CustomLog: Signed out`);
                            }}
                        >
                            Signout
                        </a>
                    </li>
                </>
            );
        },
        [isLoggedIn, setIsLoggedIn]
    );

    // useEffect(
    //     () => {
    //         if(typeof(window) === "undefined") return;

    //         console.log(`CustomLog: Subscribing to onAuthStateChanged listener`);            
    //         const unsubscriber = onAuthStateChanged(getAuth(), (user) => setIsLoggedIn(user !== null));

    //         return () => unsubscriber();
    //     }
    // );

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