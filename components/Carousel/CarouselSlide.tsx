import { FC, PropsWithChildren, useContext, useEffect, useRef } from "react";
import { carouselContext } from "./CarouselContext";
import { CarouselData } from "./CarouselData";

import styles from "./carousel_styles.module.scss";

export interface CarouselSlideProps extends PropsWithChildren {
    index: number;
    onEnter?: ()=>void;
    onExit?: ()=>void;
}

export const CarouselSlide: FC<CarouselSlideProps> = ({index, onEnter, onExit, children}) => {
    const carouselData: CarouselData = useContext<CarouselData>(carouselContext);

    useEffect(
        () => {
            if(carouselData.currentSlide == index) {
                onEnter?.();
            }
        },
        [carouselData.currentSlide, index, onEnter]
    );

    return (
        <div
            style={{display: (carouselData.currentSlide === index) ? undefined : "none"}}
            className={styles.carousel_slide}
        >
            {children}
        </div>
    );
};