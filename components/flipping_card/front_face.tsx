import { FC, PropsWithChildren, useContext } from "react";
import { FlippingCardData } from "./flipping_card_data";
import { FlippingCardContext } from "./flipping_card_context";
import { VisibleFace } from "./visible_face_enum";
import { RotatingState } from "./rotating_state_enum";

export interface FrontFaceProps extends PropsWithChildren {
    
}

export const FrontFace: FC<FrontFaceProps> = (props) => {
    const parentData: FlippingCardData = useContext<FlippingCardData>(FlippingCardContext);

    let isVisible: boolean = parentData.visibleFace === VisibleFace.front && parentData.rotatingState !== RotatingState.toHalfway;
    isVisible = isVisible || (parentData.visibleFace === VisibleFace.back && parentData.rotatingState === RotatingState.toHalfway);

    return (
        <div style={{display: (isVisible) ? "revert" : "none"}}>
            {props.children}
        </div>
    );
};