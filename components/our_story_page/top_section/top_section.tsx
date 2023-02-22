import classNames from "classnames";
import { FC } from "react";
import Image from "next/image";
import styles from "./top_section_styles.module.scss";
import productsImage from "../../../public/our-story/products.png";
import { greenTearEffectFlippedImage, greenTearEffectImage } from "../../../common_imported_images/textured_backgrounds";
import Link from "next/link";

export const TopSection: FC = (props) => {
    return (
        <section className={classNames("light_theme", styles.top_section)}>
            <Image src={greenTearEffectFlippedImage} alt="" className={classNames("tear_effect", styles.tear_effect)} />

            <div className={styles.container}>
                <div className={styles.left_grid_cell}>
                    <h1>
                        <span className="personalized_text">Hello again!</span>
                        
                        <br /><span className={styles.domain_color}>We've got you.</span>
                    </h1>

                    <hr />

                    <p className={styles.description}>
                        We know that healthy choices are not the easiest to make,
                        especially when there are only 24 hours in a day and countless
                        things to take care of.                        
                    </p>

                    <Link href="/shop">
                        <button className={"button_yellow"}>SHOP THE RANGE</button>
                    </Link>
                </div>

                <div className={styles.right_grid_cell}>
                    <Image src={productsImage} alt="" />
                </div>
            </div>
        </section>
    );
};