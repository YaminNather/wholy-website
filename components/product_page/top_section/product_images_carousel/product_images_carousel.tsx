import { CSSProperties, FC, useContext, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import Zoom, { Controlled as ControlledZoom } from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css';

import styles from "./product_images_carousel_styles.module.scss";

import { ButtonBack, ButtonNext, CarouselProvider, ImageWithZoom, Slide, Slider } from "pure-react-carousel";

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

    const [carouselSize, setCarouselSize] = useState<number[] | null>(null);

    const images: StaticImageData[] = [
        controller.uiProduct.wrappedCookieImage,
        controller.uiProduct.wrappedCookieBackImage,
        controller.uiProduct.cookieImage
    ];

    useEffect(
        () => {
            setInterval(
                () => {
                    const productImages: HTMLCollectionOf<Element> = document.getElementsByClassName(styles.product_image);
                    
                    for (let i: number = 0; i < productImages.length; ++i) {
                        const productImage: HTMLImageElement = productImages.item(i) as HTMLImageElement;
                        productImage.style.backgroundSize = "contain";
                    }
                },
                1
            );
        },
    );

    return (
        <div 
            ref={(element) => {
                if (carouselSize !== null || element === null) return;

                setCarouselSize([element!.clientWidth, element!.clientHeight])
            }} 
            style={props.style} className={classNames(styles.carousel_container, props.className)}
        >
            <CarouselProvider
                totalSlides={3}
                naturalSlideWidth={(carouselSize !== null) ? carouselSize[0] : 0}
                naturalSlideHeight={(carouselSize !== null) ? carouselSize[1] : 0}
                currentSlide={currentSlide}
            >
                <Slider>
                    {images.map(
                        (value, index, array) => {
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
                                    </div>
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
    );
}