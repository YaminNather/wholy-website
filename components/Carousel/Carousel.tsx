import { CSSProperties, FC, MouseEventHandler, PropsWithChildren, useCallback, useRef, useState } from "react";
import styles from "./carousel_styles.module.scss";

import { carouselContext } from "./CarouselContext";
import classNames from "classnames";

export interface CarouselProps extends PropsWithChildren {
    currentSlide: number;
    style?: CSSProperties;
    className?: string;
}

export const Carousel: FC<CarouselProps> = (props) => {
    const [isMouseHovering, setIsMouseHovering] = useState<boolean>(false);
    const [isMouseMoving, setIsMouseMoving] = useState<boolean>(false);    
    
    const mouseMovementStoppedSetterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
        (event): void => {
            if(mouseMovementStoppedSetterTimeoutRef.current !== null) {
                clearTimeout(mouseMovementStoppedSetterTimeoutRef.current);
                mouseMovementStoppedSetterTimeoutRef.current = null;
            }

            setIsMouseMoving(true);

            mouseMovementStoppedSetterTimeoutRef.current = setTimeout(
                () => setIsMouseMoving(false), 
                500
            );
        },
        [isMouseMoving, setIsMouseMoving]
    );

    return (
        <div 
            onMouseEnter={(event) => setIsMouseHovering(true)}
            onMouseLeave={(event) => setIsMouseHovering(false)}
            onMouseMove={onMouseMove}
            style={props.style} className={classNames(styles.carousel, props.className)}
        >
            <carouselContext.Provider value={{currentSlide: props.currentSlide, isMouseHovering: isMouseHovering, isMouseMoving: isMouseMoving}}>
                {props.children}
            </carouselContext.Provider>
        </div>
    );
};