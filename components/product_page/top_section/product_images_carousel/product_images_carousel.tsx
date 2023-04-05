import { CSSProperties, FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

import Zoom, { Controlled as ControlledZoom } from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css';

import styles from "./product_images_carousel_styles.module.scss";

import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from "pure-react-carousel";

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DotControls } from "../../../common/pure_react_carousel/dot_controls";
import { ProductPageController, ProductPageControllerContext } from "../../product_page_controller";
import classNames from "classnames";


export interface ProductImagesCarouselProps {
    style?: CSSProperties;
    className?:string;
}

export const ProductImagesCarousel: FC<ProductImagesCarouselProps> = (props) => {
    const controller: ProductPageController = useContext(ProductPageControllerContext)!;

    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const [carouselContainerElement, setCarouselContainerElement] = useState<HTMLDivElement | null>(null);
    const [carouselSize, setCarouselSize] = useState<number[]>([0.0 , 0.0]);

    const images: StaticImageData[] = [
        controller.uiProduct.wrappedCookieImage,
        controller.uiProduct.wrappedCookieBackImage,
        controller.uiProduct.cookieImage
    ];

    useEffect(
        () => {
            if (carouselContainerElement === null) return;

            const listener = (event: UIEvent) => {
                const newCarouselSize: number[] = [carouselContainerElement.clientWidth, carouselContainerElement.clientHeight];
                setCarouselSize(newCarouselSize);
            };

            window.addEventListener("resize", listener);

            return () => window.removeEventListener("resize", listener);
        },
        [carouselContainerElement]
    );    

    return (
        <div 
            ref={(element) => {
                if (element === null || element === carouselContainerElement) return;                
                
                
                const newCarouselSize: number[] = [element.clientWidth, element.clientHeight];
                setCarouselSize(newCarouselSize);
                
                setCarouselContainerElement(element);

            }} 
            style={props.style} className={classNames(styles.carousel_container, props.className)}
        >
            <div className={styles.carousel_provider_container}>
                <CarouselProvider
                    totalSlides={3}
                    naturalSlideWidth={carouselSize[0]}
                    naturalSlideHeight={carouselSize[1]}
                    currentSlide={currentSlide}
                >
                    <Slider>
                        {images.map(
                            (value, index, array) => {
                                return (
                                    <Slide key={index} index={index} className={styles.slide}>
                                        <div className={styles.slide_container}>
                                            <Zoom ZoomContent={ (data) => <>{data.img}</> }>
                                                <Image src={value} alt="" className={styles.product_image} priority={index === 0} />
                                            </Zoom>
                                        </div>
                                    </Slide>
                                );

                                return (
                                    <Slide key={index} index={index} className={styles.slide}>
                                        <Zoom  ZoomContent={ (data) => <>{data.img}</> }>
                                            <Image src={value} alt="" className={styles.product_image} />
                                        </Zoom>
                                    </Slide>
                                );

                                return (
                                    <Slide key={index} index={index}>
                                        <div className={styles.slide_container}>
                                            <Zoom 
                                                ZoomContent={(data) => {
                                                    return (
                                                        <>{data.img}</>
                                                    );
                                                }}
                                            >
                                                <Image src={value} alt="" className={styles.product_image} />
                                            </Zoom>
                                            {/* <ImageWithZoom src={value.src} alt="" imageClassName={styles.product_image}  /> */}
                                        </div>
                                    </Slide>
                                );
                            }
                        )}
                    </Slider>

                    <div className={classNames("carousel_controls", styles.carousel_controls)}>
                        <ButtonBack>
                            <span className="material-icons">keyboard_arrow_left</span>
                        </ButtonBack>
                        
                        <ButtonNext>
                            <span className="material-icons">keyboard_arrow_right</span>
                        </ButtonNext>
                    </div>
                    
                    <DotControls count={images.length} className={styles.dot_controls} />
                </CarouselProvider>
            </div>
        </div>
    );
}