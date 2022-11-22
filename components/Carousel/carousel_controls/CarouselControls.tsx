import classNames from "classnames";
import { CSSProperties, FC, useContext, useState } from "react";
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

    console.log(`CustomLog: Is Mouse Hovering? ${carouselData.isMouseHovering}`);

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
                style={{opacity: (carouselData.isMouseHovering) ? 1.0 : 0.0, ...props.buttonStyle}}
                className={props.buttonClassName}
            >
                &#x2190;
            </button>
            
            <button
                onClick={() => {
                    let newSlide: number = props.currentSlide + 1;
                    if(newSlide >= props.slideCount) newSlide = 0;
                    
                    props.onPageChange?.(newSlide);
                }}
                style={{opacity: (carouselData.isMouseHovering) ? 1.0 : 0.0, ...props.buttonStyle}}
                className={props.buttonClassName}
            >
                &#x2192;
            </button>
        </div>
    );
};