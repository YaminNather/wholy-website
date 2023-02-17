import classNames from "classnames";
import { CSSProperties, FC, PropsWithChildren } from "react";

import styles from "./stepper_styles.module.scss";

import { QuantityLabel } from "./quantity_label";
import { IncreaseButton } from "./increase_button";
import { DecreaseButton } from "./decrease_button";
export { QuantityLabel };
export { IncreaseButton };
export { DecreaseButton };

export interface StepperProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
    value: number;
}

export const Stepper: FC<StepperProps> = (props) => {
    return (        
        <div style={props.style} className={classNames(styles.stepper, props.className)}>
            {props.children}
        </div>
    );
};

