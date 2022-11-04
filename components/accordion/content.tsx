import { FC, PropsWithChildren, useContext } from "react";
import { AccordionData, accordionDataContext } from "./accordion_data";
import styles from "./accordion_styles.module.scss";

export const Content: FC<PropsWithChildren> = (props) => {
    const accordionData: AccordionData = useContext(accordionDataContext);

    return (
        <div className={styles.content_area} style={{maxHeight: ((accordionData.isExpanded) ? "unset" : "0px")}}>
            <div className={styles.content_padding}>
                {props.children}
            </div>
        </div>
    );
};