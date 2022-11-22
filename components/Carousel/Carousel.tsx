import { CSSProperties, FC, PropsWithChildren, useState } from "react";
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

    console.log(`CustomLog: isMouseHovering = ${isMouseHovering}`);
    return (
        <div 
            onMouseEnter={(event) => {
                setIsMouseHovering(true);
            }} 
            onMouseLeave={(event) => setIsMouseHovering(false)} 
            style={props.style} className={classNames(styles.carousel, props.className)}
        >
            <carouselContext.Provider value={{currentSlide: props.currentSlide, isMouseHovering: isMouseHovering}}>
                {props.children}
            </carouselContext.Provider>
        </div>
    );
};