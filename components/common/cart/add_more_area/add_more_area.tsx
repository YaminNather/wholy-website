import classNames from "classnames";
import { CSSProperties, FC } from "react";

import styles from "./add_more_area_styles.module.scss";

export interface AddMoreAreaProps {
    style?: CSSProperties;
    className?: string;
}

export const AddMoreArea: FC<AddMoreAreaProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.add_more_area, props.className)}>
            <p>If you like one, quickly add more!</p>
        </div>
    );
};