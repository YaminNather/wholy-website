import { CSSProperties, FC, MouseEventHandler, PropsWithChildren, useEffect, useState } from "react";
import styles from "./flipping_card_styles.module.scss";
import { FlippingCardContext } from "./flipping_card_context";
import { VisibleFace } from "./visible_face_enum";
import { RotatingState } from "./rotating_state_enum";
import classNames from "classnames";

export interface FlippingCardProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
    visibleFace: VisibleFace;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
    duration?: number;
}

export const FlippingCard: FC<FlippingCardProps> = (props) => {
    const [rotatingState, setRotatingState] = useState<RotatingState>(RotatingState.idle);
    
    useEffect(
        () => {
            if (rotatingState == RotatingState.idle || rotatingState == RotatingState.toIdle) {
                setRotatingState(RotatingState.toHalfway);
            }
            else {
                setRotatingState(RotatingState.toIdle);
            }
        },
        [props.visibleFace]
    );

    let scale: number = 0.0;
    if (rotatingState == RotatingState.idle || rotatingState == RotatingState.toIdle) {
        scale = 1.0;
    }
    else {
        scale = 0.0;
    }


    let duration: number = props.duration ?? 1000;

    return (
        <div 
            style={{transform: `scaleX(${scale})`, transition: `transform ${duration}ms`, ...props.style}} className={classNames(styles.flipping_card, props.className)}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onTransitionEnd={(event) => {
                if (rotatingState === RotatingState.toHalfway) {
                    setRotatingState(RotatingState.toIdle);
                }
                else if (rotatingState === RotatingState.toIdle) {
                    setRotatingState(RotatingState.idle);
                }
            }}
        >
            <FlippingCardContext.Provider value={{visibleFace: props.visibleFace, rotatingState: rotatingState}}>
                {props.children}
            </FlippingCardContext.Provider>
        </div>
    );
};