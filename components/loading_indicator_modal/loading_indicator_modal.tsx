import { CSSProperties, FC } from "react";
import styles from "./loading_indicator_modal_styles.module.scss";
import classNames from "classnames";

export interface LoadingIndicatorModalProps {
    style?: CSSProperties;
    className?: string;
    isVisible: boolean;
}

export const LoadingIndicatorModal: FC<LoadingIndicatorModalProps> = (props) => {
    return (
        <div
            className={classNames(styles.loading_indicator_modal, props.className)}
            style={{ display: (props.isVisible) ? undefined : "none", ...props.style }}
        >
            <div className={styles.loader} />
        </div>
    );
};