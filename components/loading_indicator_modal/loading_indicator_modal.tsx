import { FC } from "react";
import styles from "./loading_indicator_modal_styles.module.scss";

export interface LoadingIndicatorModalProps {
    isVisible: boolean;
}

export const LoadingIndicatorModal: FC<LoadingIndicatorModalProps> = (props) => {
    return (
        <div 
            className={styles.loading_indicator_modal} 
            style={{display: (props.isVisible) ? undefined : "none"}}
        >
            <div className={styles.loader} />
        </div>
    );
};