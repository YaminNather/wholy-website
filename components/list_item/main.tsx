import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import styles from "./list_item_styles.module.scss";

export const Main: FC<PropsWithChildren> = (props) => {
    return (
        <div className={classNames(styles.area, styles.main)}>
            {props.children}
        </div>
    );
};