import { FC } from "react";
import Image from "next/image";
import styles from "./top_section_styles.module.scss";

import classNames from "classnames";
import { UIProducts } from "../../../product_ui_details/ui_products";
import { DecreaseButton, IncreaseButton, QuantityLabel, Stepper } from "../../common/stepper/stepper";

import priceContainerImage from "../../../public/product/price-container.png";
import { ProductImagesCarousel } from "./product_images_carousel/product_images_carousel";

export const TopSection: FC = () => {
    return (
        <section className={"light_theme"}>
            <div className={classNames("container", styles.container)}>
                <div className={styles.left_grid_cell}>
                    <div className={styles.product_name_container}>
                        <Image src={UIProducts.strawberry.nameContainerImage} alt="" className={classNames(styles.product_name_background)} />
                        
                        <h1 className={classNames("dark_theme", "personalized_text")}>STRAWBERRY</h1>
                    </div>

                    <p className={styles.subtitle}>cookie Bar</p>

                    <Stepper value={0} className={styles.quantity_stepper}>
                        <DecreaseButton>-</DecreaseButton>

                        <QuantityLabel>Add your Energy Bar</QuantityLabel>

                        <IncreaseButton>+</IncreaseButton>
                    </Stepper>

                    <div className={styles.price_container}>
                        <Image src={priceContainerImage} alt="" />

                        <p>&#8377;50</p>
                    </div>
                </div>

                <div className={styles.right_grid_cell}>
                    <ProductImagesCarousel uiProduct={UIProducts.strawberry} />

                    <p>
                        Who doesn&apos;t like a good sweet tasting strawberry treat. A little crispy, a little chewy, lots of fruity and oh so delicious!
                        BTW, 100% vegan plant powered energy.
                    </p>
                </div>
            </div>            
        </section>
    );
};