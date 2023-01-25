import { CSSProperties, FC, PropsWithChildren, useContext } from "react";
import { FlippingCardData } from "./flipping_card_data";
import { FlippingCardContext } from "./flipping_card_context";
import { VisibleFace } from "./visible_face_enum";
import { RotatingState } from "./rotating_state_enum";

import styles from "./flipping_card_styles.module.scss";
import classNames from "classnames";

export interface FrontFaceProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
}

export const FrontFace: FC<FrontFaceProps> = (props) => {
    const parentData: FlippingCardData = useContext<FlippingCardData>(FlippingCardContext);

    let isVisible: boolean = parentData.visibleFace === VisibleFace.front && parentData.rotatingState !== RotatingState.toHalfway;
    isVisible = isVisible || (parentData.visibleFace === VisibleFace.back && parentData.rotatingState === RotatingState.toHalfway);

    return (
        <div style={{display: (isVisible) ? undefined : "none", ...props.style}} className={classNames(styles.face, props.className)}>
            {props.children}
        </div>
    );
};