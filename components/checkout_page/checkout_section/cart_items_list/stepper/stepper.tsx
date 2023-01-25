import classNames from "classnames";
import { FC } from "react";

import styles from "./stepper_styles.module.scss";

export interface StepperProps {
    value: number;
    onClickDecreaseQuantityButton: ()=>void;
    onClickIncreaseQuantityButton: ()=>void;
}

export const Stepper: FC<StepperProps> = (props) => {
    return (
        <div className={classNames(styles.stepper)}>
            <button onClick={(event) => props.onClickDecreaseQuantityButton()} className={styles.left_button}>{"-"}</button>

            <p className={styles.quantity_label}>{props.value} Bar{(props.value < 2) ? "" : "s"}</p>

            <button onClick={(event) => props.onClickIncreaseQuantityButton()} className={styles.right_button}>{"+"}</button>
        </div>
    );
};