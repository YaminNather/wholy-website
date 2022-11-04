import { FC } from "react";
import styles from "./carousel_controls_styles.module.scss";

export interface CarouselControlsProps {
    slideCount: number;
    currentSlide: number;
    onPageChange?: (newPage: number)=>void;
}

export const CarouselControls: FC<CarouselControlsProps> = (props) => {
    return (
        <div className={styles.carousel_controls_area}>
            <button 
                onClick={() => {
                    let newSlide: number = props.currentSlide - 1;
                    if(newSlide < 0) newSlide = props.slideCount - 1;
                    
                    props.onPageChange?.(newSlide);
                }}
            >
                &#x2190;
            </button>
            
            <button
                onClick={() => {
                    let newSlide: number = props.currentSlide + 1;
                    if(newSlide >= props.slideCount) newSlide = 0;
                    
                    props.onPageChange?.(newSlide);
                }}
            >
                &#x2192;
            </button>
        </div>
    );
};