import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import Product from "../../../models/product";
import FirebaseProductRepository from "../../../repository/firebase_product_repository";
import ProductRepository from "../../../repository/product_repository";
import { Carousel } from "../../Carousel/Carousel";
import { CarouselSlideIndicator } from "../../Carousel/CarouselSlideIndicator/CarouselSlideIndicator";
import styles from "./products_carousel_section_styles.module.scss";
import { ProductSlide } from "./product_slide/product_slide";
import Image from "next/image";

import tearEffectImage from "../../../public/green-tear-effect.png";
import { CarouselControls } from "../../Carousel/carousel_controls/CarouselControls";

export const ProductsCarouselSection: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(
        () => {
            const asyncPart = async (): Promise<void> => {
                const productRepository: ProductRepository = new FirebaseProductRepository();
                const pulledProducts: Product[] = await productRepository.getAllProducts();
                setProducts(pulledProducts);
            };
            asyncPart();
        },
        []
    );

    return (
        <section id="products-carousel" className={styles.products_carousel_section}>
            <Carousel currentSlide={currentSlide} className={styles.carousel}>
                {products.map(
                    (value, index, array) => {
                        return <ProductSlide product={value} index={index} />;
                    }
                )}

                <CarouselSlideIndicator
                    containerClassName={classNames(styles.slide_indicator)}
                    slideCount={products.length}
                    currentSlide={currentSlide}
                    onChanged={(newIndex) => setCurrentSlide(newIndex)}
                />

                <CarouselControls
                    className={styles.carousel_controls}
                    currentSlide={currentSlide} slideCount={products.length} 
                    onPageChange={(newPage) => setCurrentSlide(newPage)}
                />
            </Carousel>            

            <Image src={tearEffectImage} alt="" className={styles.tear_effect} />
        </section>
    );
};