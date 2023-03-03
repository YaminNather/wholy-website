import { FC, useContext } from "react";
import Image from "next/image";
import styles from "./unique_selling_points_section_styles.module.scss";
import classNames from "classnames";

import { UniqueSellingPointsArea } from "../../common/unique_selling_points_area/unique_selling_points_area";
import { productToTexturedBackgroundMap } from "../common/product_to_textured_background_map";
import { ProductPageController, ProductPageControllerContext } from "../product_page_controller";

export const UniqueSellingPointsSection: FC = (props) => {
    const controller: ProductPageController = useContext(ProductPageControllerContext)!;

    return (
        <section id="unique_selling_points_section" className={classNames("light_theme", styles.section)}>
            <Image src={productToTexturedBackgroundMap.get(controller.uiProduct.id)!} alt="" className={classNames("background_image")} />
            
            {/* <Image src={controller.uiProduct.concentricCirclesImage} alt="" className={classNames("background_prop", styles.concentric_circles)} /> */}

            <UniqueSellingPointsArea className={"dark_theme"} />
        </section>
    );
};