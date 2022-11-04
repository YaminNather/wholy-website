import { CSSProperties, Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useRef, useState } from "react";
import { Carousel } from "../Carousel";

export interface AutoScrollingCarouselProps {
    style?: CSSProperties;
    className?: string;
    controller?: AutoScrollingCarouselController;
    slideCount: number;
    delay?: number;
    onSlideChanged?: (newSlide: number)=>void;
}

export const AutoScrollingCarousel: FC<PropsWithChildren<AutoScrollingCarouselProps>> = (props) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const timeoutRef = useRef<any>();

    useEffect(
        () => {
            props.onSlideChanged?.(currentSlide);

            timeoutRef.current = setTimeout(
                () => {
                    const newSlide: number = (currentSlide + 1 < props.slideCount) ? currentSlide + 1 : 0;
                    setCurrentSlide(newSlide);
                },
                props.delay ?? 5000
            );

            return (): void => { clearTimeout(timeoutRef.current) };
        },
        [currentSlide]
    );

    props.controller?.updateWithComponentData(setCurrentSlide);

    return (
        <Carousel style={props.style} className={props.className} currentSlide={currentSlide}>
            {props.children}
        </Carousel>
    );
};

export class AutoScrollingCarouselController {
    public updateWithComponentData(currentSlideSetter: Dispatch<SetStateAction<number>>): void {
        this.currentSlideSetter = currentSlideSetter;
    }

    public setCurrentSlide(newSlide: number): void {
        this.currentSlideSetter?.(newSlide);
    }    



    private currentSlideSetter: Dispatch<SetStateAction<number>> | undefined = undefined;
}