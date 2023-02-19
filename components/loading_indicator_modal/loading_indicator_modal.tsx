import { CSSProperties, FC } from "react";
import styles from "./loading_indicator_modal_styles.module.scss";
import classNames from "classnames";

export interface LoadingIndicatorModalProps {
    style?: CSSProperties;
    className?: string;
    isVisible: boolean;
    loaderStyle?: CSSProperties;
    loaderClassName?: string;
}

export const LoadingIndicatorModal: FC<LoadingIndicatorModalProps> = (props) => {
    return (
        <div
            className={classNames(styles.loading_indicator_modal, props.className)}
            style={{ display: (props.isVisible) ? undefined : "none", ...props.style }}
        >
            <div style={props.loaderStyle} className={classNames(styles.loader_container, props.className)}>
                <div className={classNames(styles.loader)} />
            </div>
        </div>
    );
};