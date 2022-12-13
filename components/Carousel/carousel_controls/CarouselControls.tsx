import classNames from "classnames";
import { CSSProperties, FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { carouselContext } from "../CarouselContext";
import { CarouselData } from "../CarouselData";
import styles from "./carousel_controls_styles.module.scss";

export interface CarouselControlsProps {
    slideCount: number;
    currentSlide: number;
    onPageChange?: (newPage: number)=>void;
    style?: CSSProperties;
    className?: string;
    buttonStyle?: CSSProperties;
    buttonClassName?: string;
}

export const CarouselControls: FC<CarouselControlsProps> = (props) => {
    const carouselData: CarouselData = useContext(carouselContext)!;

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const hideTimerRef = useRef<NodeJS.Timeout | null>(null);  

    useEffect(
        (): void => {
            if(carouselData.isMouseMoving) {
                setIsVisible(true);

                if(hideTimerRef.current !== null) {
                    clearTimeout(hideTimerRef.current);
                    hideTimerRef.current = null;
                    return;
                }
            }
            else {
                if(hideTimerRef.current === null) {
                    hideTimerRef.current = setTimeout(() => setIsVisible(false), 2000);
                }
            }
        },
        [carouselData.isMouseMoving, hideTimerRef]
    );

    return (
        <div 
            style={props.style} 
            className={classNames(styles.carousel_controls_area, props.className)}
        >
            <button
                onClick={() => {
                    let newSlide: number = props.currentSlide - 1;
                    if(newSlide < 0) newSlide = props.slideCount - 1;
                    
                    props.onPageChange?.(newSlide);
                }}
                style={{opacity: (isVisible) ? 1.0 : 0.0, ...props.buttonStyle}}
                className={props.buttonClassName}
            >
                {"<"}
            </button>
            
            <button
                onClick={() => {
                    let newSlide: number = props.currentSlide + 1;
                    if(newSlide >= props.slideCount) newSlide = 0;
                    
                    props.onPageChange?.(newSlide);
                }}
                style={{opacity: (isVisible) ? 1.0 : 0.0, ...props.buttonStyle}}
                className={props.buttonClassName}
            >
                {">"}
            </button>
        </div>
    );
};