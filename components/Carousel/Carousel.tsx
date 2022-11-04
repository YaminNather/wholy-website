import { CSSProperties, FC, PropsWithChildren } from "react";
import styles from "./carousel_styles.module.scss";

import { carouselContext } from "./CarouselContext";
import classNames from "classnames";

export interface CarouselProps extends PropsWithChildren {
    currentSlide: number;
    style?: CSSProperties;
    className?: string;
}

export const Carousel: FC<CarouselProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.carousel, props.className)}>
            <carouselContext.Provider value={{currentSlide: props.currentSlide}}>
                {props.children}
            </carouselContext.Provider>
        </div>
    );
};