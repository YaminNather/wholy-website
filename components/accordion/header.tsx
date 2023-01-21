import classNames from "classnames";
import Image from "next/image";
import { FC, PropsWithChildren, useContext } from "react";
import { AccordionData, accordionDataContext } from "./accordion_data";
import styles from "./accordion_styles.module.scss";

import expandCircleDownVector from "../../public/common_icons/expand-circle-down.svg";

export interface HeaderProps extends PropsWithChildren {
    onToggled?: (isExpanded: boolean)=>void;
}

export const Header: FC<HeaderProps> = (props) => {
    const accordionData: AccordionData = useContext(accordionDataContext);

    return (
        <div className={classNames(styles.header_area)} onClick={(event) => props.onToggled?.(!accordionData.isExpanded)}>
            <div className={styles.content}>
                <div>
                    {props.children}
                </div>

                <button className={classNames("icon_button", styles.toggle_expand_button)} style={{transform: (accordionData.isExpanded) ? `rotate(180deg)` : undefined}}>
                    <Image src={expandCircleDownVector} alt="" />
                </button>
            </div>
            
            {/* <hr /> */}
        </div>
    );
};