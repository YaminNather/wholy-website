import classNames from "classnames";
import { CSSProperties, FC, MouseEventHandler, useCallback, useLayoutEffect, useRef, useState } from "react";

import navbarStyles from "../nav_bar_styles.module.scss";
import styles from "./account_button_styles.module.scss";
import Link from "next/link";
import { getAuth } from "firebase/auth";

export interface AccountButtonProps {
    style?: CSSProperties;
    className?: string;
    isLoggedIn?: boolean;
}

export const AccountButton: FC<AccountButtonProps> = (props) => {
    const dropdownOptionsContainer = useRef<HTMLDivElement | null>(null);
    const [dropdownOptionsContainerOpenHeight, setDrodownOptionsContainerOpenHeight] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const onAccountButtonClicked = useCallback<MouseEventHandler<HTMLButtonElement>>(
        (event): void => {
            setIsOpen(!isOpen);
        },
        [isOpen]
    );

    const onLogoutButtonClicked = useCallback<MouseEventHandler<HTMLButtonElement>>(
        (event): void => {
            async function asyncPart(): Promise<void> {
                await getAuth().signOut();
                alert("Signed out");
            }

            asyncPart();
        },
        []
    );

    useLayoutEffect(
        () => {
            setTimeout(
                () => {
                    setDrodownOptionsContainerOpenHeight(dropdownOptionsContainer.current!.clientHeight);
                    setIsOpen(false);                    
                }, 
                1
            );
        },
        []
    );

    return (
        <div style={{ display: (props.isLoggedIn) ? undefined : "none", ...props.style }} className={classNames(styles.account_button_container, props.className)}>
            <button onClick={onAccountButtonClicked} className={classNames("icon_button", navbarStyles.account_button)}>
                <span className={classNames("material-symbols-outlined")}>account_circle</span>
            </button>

            <div 
                style={{ height: (dropdownOptionsContainerOpenHeight === null) ? undefined : (isOpen) ? dropdownOptionsContainerOpenHeight : "0px" }} 
                className={styles.dropdown_options_container_expander}
            >
                <div ref={dropdownOptionsContainer} className={classNames("light_theme", styles.dropdown_options_container)}>
                    <Link href="/orders">
                        <button className={styles.dropdown_option}>ORDERS</button>
                    </Link>

                    <button onClick={onLogoutButtonClicked} className={styles.dropdown_option}>SIGN OUT</button>
                </div>
            </div>
        </div>
    );
};