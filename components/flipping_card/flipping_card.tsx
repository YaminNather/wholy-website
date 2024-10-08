import { CSSProperties, FC, MouseEventHandler, PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from "./flipping_card_styles.module.scss";
import { FlippingCardContext } from "./flipping_card_context";
import { VisibleFace } from "./visible_face_enum";
import { RotatingState } from "./rotating_state_enum";
import classNames from "classnames";
import { useIsFirstRender } from "../../ui_helpers/is_first_render/use_is_first_render";

export interface FlippingCardProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
    visibleFace: VisibleFace;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
    onClick?: MouseEventHandler<HTMLDivElement>;
    duration?: number;
}

export const FlippingCard: FC<FlippingCardProps> = (props) => {
    const isFirstRender: boolean = useIsFirstRender();
    const [rotatingState, setRotatingState] = useState<RotatingState>(RotatingState.idle);
    
    useEffect(
        () => {
            if (isFirstRender) return;

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
            className={classNames(styles.mouse_events_capturer)}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
        >
            <div
                style={{transform: `scaleX(${scale})`, transition: `transform ${duration}ms`, ...props.style}} 
                className={classNames(styles.card, props.className)}
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
        </div>
    );
};