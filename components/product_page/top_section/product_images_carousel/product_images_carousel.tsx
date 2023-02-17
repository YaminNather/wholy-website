import { FC, useState } from "react";
import Image, { StaticImageData } from "next/image";

import styles from "./product_images_carousel_styles.module.scss";

import { ButtonBack, ButtonNext, CarouselProvider, Dot, Slide, Slider } from "pure-react-carousel";
import { UIProduct } from "../../../../product_ui_details/ui_product";

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DotControls } from "../../../common/pure_react_carousel/dot_controls";

export interface ProductImagesCarouselProps {
    uiProduct: UIProduct;
}

export const ProductImagesCarousel: FC<ProductImagesCarouselProps> = (props) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const images: StaticImageData[] = [
        props.uiProduct.wrappedCookieImage,
        props.uiProduct.wrappedCookieImage,
        props.uiProduct.wrappedCookieImage
    ];

    return (
        <div className={styles.carousel_container}>
            <CarouselProvider
                totalSlides={3}
                isIntrinsicHeight={true}
                naturalSlideWidth={0}
                naturalSlideHeight={0}
                currentSlide={currentSlide}
            >
                <Slider>
                    {images.map(
                        (value, index, array) => {
                            return (
                                <Slide key={index} index={index} className={styles.slide}>
                                    <Image src={value} alt="" />
                                </Slide>
                            );
                        }
                    )}
                </Slider>
                
                <DotControls count={images.length} className={styles.dot_controls} />
            </CarouselProvider>
        </div>
    );
}