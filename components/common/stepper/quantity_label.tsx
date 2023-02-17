import { CSSProperties, FC, PropsWithChildren, useContext } from "react";
import styles from "./stepper_styles.module.scss";
import { StepperData, StepperDataContext } from "./stepper_data";
import classNames from "classnames";

export interface QuantityLabelProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
}

export const QuantityLabel: FC<QuantityLabelProps> = (props) => {
    return (
        <p style={props.style} className={classNames(styles.quantity_label, props.className)}>{props.children}</p>
    );
};