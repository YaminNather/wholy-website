import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from "pure-react-carousel";
import { FC, useEffect, useState } from "react";
import { UIProducts } from "../../../product_ui_details/ui_products";

import styles from "./catalogue_section_styles.module.scss";

import 'pure-react-carousel/dist/react-carousel.es.css';
import { Product } from "./product/product";
import classNames from "classnames";
import { useBreakpoint } from "../../../ui_helpers/breakpoint/use_breakpoint";
import { Breakpoint } from "../../../ui_helpers/breakpoint/breakpoint";

export const CatalogueSection: FC = (props) => {
    const breakpoint: Breakpoint = useBreakpoint();

    return (
        <section id="catalogue" className={classNames("light_theme", styles.section)}>
            <CarouselProvider totalSlides={UIProducts.array.length} naturalSlideWidth={100} naturalSlideHeight={110} visibleSlides={(breakpoint != Breakpoint.extraSmall) ? 3 : 1}>
                <Slider>
                    {UIProducts.array.map(
                        (value, index, array) => {
                            return (
                                <Slide key={index} index={index}>
                                    <div className={styles.product_card_container}>
                                        <Product product={value} backFaceText={backFaceText[value.name]} />
                                    </div>
                                </Slide>
                            );
                        }
                    )}
                </Slider>

                <div className={styles.carousel_controls}>
                    <ButtonBack className="button_yellow">{"<"}</ButtonBack>
                    
                    <ButtonNext className="button_yellow">{">"}</ButtonNext>
                </div>
                
            </CarouselProvider>
        </section>
    );
};

const backFaceText: { [key: string]: string } = {
    [UIProducts.blueberry.name]: "Eat your blues away with Blueberry!",
    [UIProducts.pineapple.name]: "No one has time to cut and carve a pineapple! we've done it all for you! Welcoming Fine Pineapple!",
    [UIProducts.strawberry.name]: "Who doesn't like a good sweet tasting strawberry treat. Merry Strawberry!",
    [UIProducts.fig.name]: "Fig'ured out that this was the most delicious form of figs. Here comes Fig!"
};