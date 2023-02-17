import { CSSProperties, FC, ReactNode } from "react";
import styles from "./dot_controls_styles.module.scss";
import { Dot } from "pure-react-carousel";
import classNames from "classnames";

export interface DotControlsProps {
    readonly style?: CSSProperties;
    readonly className?: string;
    readonly count: number;
}

export const DotControls: FC<DotControlsProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.dot_controls, props.className)}>
            {[...Array(props.count)].map(
                (value, index, array): ReactNode => {
                    return <Dot className={classNames(styles.dot)} key={index} slide={index} />;
                }
            )}
        </div>
    );
};