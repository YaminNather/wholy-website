import { FC } from "react";
import Image from "next/image";
import styles from "./ingredients_section_styles.module.scss";

import classNames from "classnames";
import { UIProducts } from "../../../product_ui_details/ui_products";

import grainBowlImage from "../../../public/product/grain-bowl.png";
import datesBowlImage from "../../../public/product/dates-bowl.png";

import peanutsImage from "../../../public/product/peanuts.png";

export const IngredientsSection: FC = (props) => {
    return (
        <section style={{backgroundColor: UIProducts.strawberry.color}} className={classNames(styles.ingredients_section)}>
            <div className={classNames("container", styles.container)}>
                <div className={classNames(styles.cell, styles.oats_details_cell)}>
                    <Image src={grainBowlImage} alt="" />

                    <div className={styles.text_area}>
                        <h2>Oats Flour or Oats</h2>

                        <p className={"personalized_text"}>
                            Baked with hand milled oats flour. Rich in <strong>anti oxidants and beta glucan</strong> for heart health,
                            gut health, gut health & cholestrol reduction.
                        </p>
                    </div>
                </div>

                <Image src={UIProducts.strawberry.wrappedCookiePortraitImage} alt="" className={styles.cookie} />
                
                <div className={classNames(styles.cell, styles.peanuts_details_cell)}>
                    <Image src={peanutsImage} alt="" className={styles.peanuts_image} />
                    <div className={styles.text_area}>
                        <h2>Peanuts</h2>

                        <p className={"personalized_text"}>
                            Peanuts are <strong>certified super food</strong>. 
                            Our primary source of protein and healthy fats for all day plant powered energy.
                        </p>
                    </div>
                </div>
                
                <div className={classNames(styles.cell, styles.dates_details_cell)}>
                    <div className={styles.text_area}>
                        <h2>Dates</h2>

                        <p className={"personalized_text"}>
                            Dates are packed with iron to <strong>boost your brain health</strong>.
                        </p>
                    </div>
                    
                    <Image src={datesBowlImage} alt="" />
                </div>
                
                <div className={styles.almonds_details_cell}>
                    <div className={styles.text_area}>
                        <h2>Almonds, chia seeds and flax seeds</h2>

                        <p className={"personalized_text"}>
                            Topped with <strong>heart healthy nuts & seeds</strong> for that extra antioxidant
                            and nutrient boost
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};