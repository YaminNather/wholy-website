import { FC } from "react";
import Image from "next/image";
import styles from "./unique_selling_points_section_styles.module.scss";
import classNames from "classnames";
import { yellowTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";
import { UniqueSellingPointsArea } from "../../common/unique_selling_points_area/unique_selling_points_area";

export const UniqueSellingPointsSection: FC = (props) => {
    return (
        <section id="unique_selling_points_section" className={classNames("light_theme", styles.section)}>
            <Image src={yellowTexturedBackgroundImage} alt="" className={"background_image"} />

            <div className={classNames("container", styles.container)}>
                <h1>Baked with real stuff found in your kitchen!</h1>

                <hr />
            </div>

            <UniqueSellingPointsArea className={styles.unique_selling_points_area} />
        </section>
    );
};