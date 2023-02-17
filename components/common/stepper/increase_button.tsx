import { CSSProperties, FC, MouseEventHandler, PropsWithChildren, useCallback } from "react";
import styles from "./stepper_styles.module.scss";
import classNames from "classnames";

export interface IncreaseButtonProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IncreaseButton: FC<IncreaseButtonProps> = (props) => {
    return (
        <button style={props.style} className={classNames(styles.right_button, props.className)} onClick={props.onClick}>
            {props.children}
        </button>
    );
};