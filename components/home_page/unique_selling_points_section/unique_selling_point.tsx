import { CSSProperties, FC } from "react";
import Image from "next/image";
import styles from "./unique_selling_point_styles.module.scss";
import classNames from "classnames";

export interface UniqueSellingPointProps {
    style?: CSSProperties;
    className?: string;
    image: string;
    description: string;
}

export const UniqueSellingPoint: FC<UniqueSellingPointProps> = (props) => {
    return (
        <div style={props.style} className={classNames(props.className, styles.unique_selling_point)}>
            <div className={styles.pictorial_representation}>
                <div className={styles.container} />

                <div className={styles.image} />
            </div>
            
            <p className={"personalized_text"}>{props.description}</p>
        </div>
    );
};