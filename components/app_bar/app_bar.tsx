import { CSSProperties, FC } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "./app_bar_styles.module.scss";

import menuIconVector from "../../public/common_icons/hamburger-menu.svg";
import closeMenuIconVector from "../../public/common_icons/x.svg";

export interface AppBarProps {
    classNames?: string;
    style?: CSSProperties;
    isNavMenuOpen: boolean;
    onToggleNavMenuButtonPressed?: (isOpen: boolean)=>void;
}

export const AppBar: FC<AppBarProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.app_bar, props.classNames)}>
            <div className={classNames("container", styles.container)}>
                <button className={"icon_button"} onClick={(event) => props.onToggleNavMenuButtonPressed?.(!props.isNavMenuOpen)}>
                    <Image src={(!props.isNavMenuOpen) ? menuIconVector : closeMenuIconVector} alt="" />
                </button>
            </div>
        </div>
    );
};