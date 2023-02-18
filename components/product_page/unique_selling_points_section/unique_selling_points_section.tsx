import { FC } from "react";
import Image from "next/image";
import styles from "./unique_selling_points_section_styles.module.scss";
import classNames from "classnames";
import { UIProducts } from "../../../product_ui_details/ui_products";

import { UniqueSellingPointsArea } from "../../common/unique_selling_points_area/unique_selling_points_area";
import { redTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";

export const UniqueSellingPointsSection: FC = (props) => {
    return (
        <section id="unique_selling_points_section" className={classNames("light_theme", styles.section)}>
            <Image src={redTexturedBackgroundImage} alt="" className={classNames("background_image")} />
            
            <Image src={UIProducts.strawberry.concentricCirclesImage} alt="" className={classNames("background_prop", styles.concentric_circles)} />

            <UniqueSellingPointsArea className={"dark_theme"} />
        </section>
    );
};