import classNames from "classnames";
import { CSSProperties, FC, PropsWithChildren } from "react";
import { accordionDataContext } from "./accordion_data";
import styles from "./accordion_styles.module.scss";

export interface AccordionProps extends PropsWithChildren {
    className?: string;
    style?: CSSProperties;
    isExpanded: boolean;
}

export const Accordion: FC<AccordionProps> = (props) => {
    return (
        <div className={classNames(styles.accordion, props.className)} style={props.style}>
            <accordionDataContext.Provider value={{isExpanded: props.isExpanded}}>
                {props.children}
            </accordionDataContext.Provider>
        </div>
    );
};