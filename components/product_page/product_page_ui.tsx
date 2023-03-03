import { FC, useContext } from "react";
import Image from "next/image";

import styles from "./product_page_ui_styles.module.scss";

import { TopSection } from "./top_section/top_section";
import * as nav_bar from "../common/nav_bar/nav_bar";
import { NavBarSystem } from "../common/nav_bar/nav_bar_system";
import { IngredientsSection } from "./ingredients_section/ingredients_section";
import { CallToActionSection } from "./call_to_action_section/call_to_action_section";
import { UniqueSellingPointsSection } from "./unique_selling_points_section/unique_selling_points_section";
import { FooterSection } from "../common_sections/footer_section/footer_section";
import { ReviewSection } from "./review_section/review_section";
import { ProductPageController, ProductPageControllerContext } from "./product_page_controller";
import classNames from "classnames";

export const ProductPageUI: FC = (props) => {
    const controller: ProductPageController = useContext(ProductPageControllerContext)!;

    return (
        <>
            <NavBarSystem colorScheme={nav_bar.ColorScheme.light} />

            <TopSection />


            <div className={styles.colored_sections_container}>
                <Image src={controller.uiProduct.concentricCirclesImage} alt="" className={classNames("background_prop", styles.concentric_circles)} />

                <IngredientsSection />

                <UniqueSellingPointsSection />
            </div>

            <ReviewSection />

            <CallToActionSection />

            <FooterSection />
        </>
    );
}