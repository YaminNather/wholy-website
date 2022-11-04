import classnames from "classnames";
import { FC } from "react";
import styles from "../carousel_styles.module.scss";

export interface CarouselSlideIndicatorProps {
    slideCount: number;
    currentSlide: number;
    onChanged?: (newIndex: number)=>void;
    containerClassName?: string;
}

export const CarouselSlideIndicator: FC<CarouselSlideIndicatorProps> = (props) => {
    return (
        <div className={classnames(styles.carousel_slide_indicator, props.containerClassName)}>
            {[...Array(props.slideCount)].map((value, index, _) => (
                <div
                    key={index}
                    className={styles.indicator}
                    onClick={() => props.onChanged?.(index)} 
                >
                    <div className={styles.icon} style={{backgroundColor: (props.currentSlide == index) ? "white" : "transparent" }}  />
                </div>
            ))}
        </div>
    );
};