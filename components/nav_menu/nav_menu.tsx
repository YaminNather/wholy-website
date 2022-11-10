import classNames from "classnames";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./nav_menu_styles.module.scss";

export interface NavMenuProps {
    isOpen: boolean;
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

    useEffect(
        () => {
            if(typeof(window) === "undefined") return;

            console.log(`CustomLog: Subscribing to onAuthStateChanged listener`);            
            const unsubscriber = onAuthStateChanged(getAuth(), (user) => setIsLoggedIn(user !== null));

            return () => unsubscriber();
        }
    );

    return (
        <div className={classNames(styles.nav_menu)} style={{height: (props.isOpen) ? "100vh" : "0vh" }}>
            <div className={styles.main}>
                <nav>
                    <ul>
                        <li><Link href="/products">Products</Link></li>
                        
                        <li><Link href="/authentication" style={{ display: (!isLoggedIn) ? "unset" : "none" }}>{"Sign up/Login"}</Link></li>                        

                        {(isLoggedIn) ? buildIsLoggedInLinks() : <></>}
                    </ul>
                </nav>
            </div>
        </div>
    );
};