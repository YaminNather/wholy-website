import { FC, useContext, useState } from "react";
import Image, { StaticImageData } from "next/image";

import styles from "./product_images_carousel_styles.module.scss";

import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from "pure-react-carousel";

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DotControls } from "../../../common/pure_react_carousel/dot_controls";
import { ProductPageController, ProductPageControllerContext } from "../../product_page_controller";
import classNames from "classnames";

export const ProductImagesCarousel: FC = (props) => {
    const controller: ProductPageController = useContext(ProductPageControllerContext)!;

    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const images: StaticImageData[] = [
        controller.uiProduct.wrappedCookieImage,
        controller.uiProduct.wrappedCookieBackImage,
        controller.uiProduct.cookieImage
    ];

    return (
        <div className={styles.carousel_container}>
            <CarouselProvider
                totalSlides={3}
                isIntrinsicHeight={true}
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                currentSlide={currentSlide}
            >
                <Slider>
                    {images.map(
                        (value, index, array) => {
                            return (
                                <Slide key={index} index={index}>
                                    <div className={styles.slide_container}>
                                        <Image src={value} alt="" />
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