import { CSSProperties, FC, MouseEventHandler, PropsWithChildren } from "react";
import styles from "./stepper_styles.module.scss";
import classNames from "classnames";

export interface DecreaseButtonProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const DecreaseButton: FC<DecreaseButtonProps> = (props) => {
    return (
        <button style={props.style} className={classNames(styles.left_button, props.className)} onClick={props.onClick}>
            {props.children}
        </button>
    );
};