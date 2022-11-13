import { FC } from "react";
import Image from "next/image";
import styles from "./product_info_section_styles.module.scss";
import Link from "next/link";

import backgroundImage from "../../../public/yellow-textured-background.jpeg";
import strawberryBarImage from "../../../public/home/product-info/strawberry-bar.png";
import uniqueSellingPointsImage from "../../../public/home/product-info/unique-selling-points.png";
import badgeImage from "../../../public/home/product-info/badge.png";
import tearEffectImage from "../../../public/yellow-tear-effect.png";
import classNames from "classnames";

export const ProductInfoSection: FC = (props) => {
    return (
        <section id="product-info" className={styles.product_info_section}>
            <Image src={backgroundImage} alt="" className="background_image" />
            
            <Image src={tearEffectImage} alt="" className={classNames("tear_effect", styles.tear_effect)} />

            <div className={styles.grid}>
                <div className={styles.left_grid_cell}>
                    <h1>How is Wholy made and why is it healthy?</h1>

                    <h2 className="light_theme">Simple Ingredients. Simple Snacking.</h2>

                    <p className="light_theme">
                        Here&#39;s to a life of minimalism, with a few
                        ingredients that are truly delicious.
                    </p>

                    <Link href="/products"><button>Know More</button></Link>

                    <Image src={uniqueSellingPointsImage} alt={""} className={styles.unique_selling_points} />
                </div>

                <div className={styles.right_grid_cell}>
                    <div className={styles.cookie_container}>
                        <Image src={strawberryBarImage} alt="" className={styles.cookie_image} />
                        
                        <Image src={badgeImage} alt="" className={styles.badge} />
                    </div>

                </div>
            </div>
        </section>
    );
};