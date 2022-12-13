import { FC, ReactNode, useState } from "react";
import styles from "./hero_section_styles.module.scss";
import { Carousel } from "../../Carousel/Carousel";
import { CarouselSlide0 } from "./carousel_slide_0";
import { CarouselSlideIndicator } from "../../Carousel/CarouselSlideIndicator/CarouselSlideIndicator";
import { CarouselSlide } from "../../Carousel/CarouselSlide";
import { CarouselSlide1 } from "./carousel_slide_1";
import { CarouselSlide2 } from "./carousel_slide_2";
import { CarouselControls } from "../../Carousel/carousel_controls/CarouselControls";
import classNames from "classnames";

const carouselSlides: ReactNode[] = [
    <CarouselSlide0 />,
    <CarouselSlide1 />,
    <CarouselSlide2 />
];

export const HeroSection: FC = (props) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    return (
        <section id="hero" className={styles.hero_section}>
            <Carousel currentSlide={currentSlide} className={styles.carousel}>
                {carouselSlides.map(
                    (value, index, array) => {
                        return (
                            <CarouselSlide index={index}>
                                {value}
                            </CarouselSlide>
                        );
                    }
                )}

                <CarouselSlideIndicator 
                    slideCount={carouselSlides.length}
                    currentSlide={currentSlide}
                    onChange={(newIndex) => setCurrentSlide(newIndex)} 
                    containerClassName={styles.carousel_slide_indicator}
                />

                <CarouselControls
                    slideCount={carouselSlides.length}
                    currentSlide={currentSlide}
                    onPageChange={(newIndex) => setCurrentSlide(newIndex)}
                    buttonClassName={classNames("button_yellow", styles.carousel_controls_button)}
                />
            </Carousel>
        </section>
    );
};