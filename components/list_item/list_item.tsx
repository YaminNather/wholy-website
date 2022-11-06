import classNames from "classnames";
import { CSSProperties, FC, PropsWithChildren } from "react";
import styles from "./list_item_styles.module.scss";

export interface ListItemProps extends PropsWithChildren {
    className?: string;
    style?: CSSProperties;
}

export const ListItem : FC<ListItemProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.list_item, props.className)}>
            {props.children}
        </div>
    );
};