import { FC, useContext } from "react";
import Image from "next/image";
import styles from "./ingredients_section_styles.module.scss";

import classNames from "classnames";

import doodleImage from "../../../public/product/doodle.png";

import grainBowlImage from "../../../public/product/grain-bowl.png";
import datesBowlImage from "../../../public/product/dates-bowl.png";

import peanutsImage from "../../../public/product/peanuts.png";
import almondsImage from "../../../public/product/almonds.png";
import { ProductPageController, ProductPageControllerContext } from "../product_page_controller";
import { productToTexturedBackgroundMap } from "../common/product_to_textured_background_map";

export const IngredientsSection: FC = (props) => {
    const controller: ProductPageController = useContext(ProductPageControllerContext)!;

    return (
        <section className={classNames(styles.ingredients_section)}>
            <Image src={productToTexturedBackgroundMap.get(controller.uiProduct.id)!} alt="" className={"background_image"} />

            <div className={classNames("container", styles.container)}>
                <div className={styles.left_cell}>
                    <div className={classNames(styles.cell, styles.oats_details_cell)}>
                        <div className={styles.ingredient_in_bowl_image_container}>
                            <Image src={grainBowlImage} alt="" className={styles.image} />

                            <Image src={doodleImage} alt="" className={styles.doodle} />
                        </div>

                        <div className={styles.text_area}>
                            <h2>Oats Flour or Oats</h2>

                            <p className={"personalized_text"}>
                                Baked with hand milled oats flour. Rich in <strong>anti oxidants and beta glucan</strong> for heart health,
                                gut health & cholestrol reduction.
                            </p>
                        </div>
                    </div>
                    
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
                        
                        <div className={styles.ingredient_in_bowl_image_container}>
                            <Image src={datesBowlImage} alt="" className={styles.image} />

                            <Image src={doodleImage} alt="" className={styles.doodle} />
                        </div>
                    </div>
                    
                    <div className={styles.almonds_details_cell}>
                        <div className={styles.text_area}>
                            <div className={styles.heading}>
                                <h2>
                                    Almonds, chia seeds <br/>and flax seeds.
                                </h2>

                                <Image src={almondsImage} alt="" />
                            </div>

                            <p className={"personalized_text"}>
                                Topped with <strong>heart healthy nuts & seeds</strong> for that extra antioxidant
                                and nutrient boost
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.right_cell}>
                    <div className={styles.cookie_container}>
                        <Image src={controller.uiProduct.unwrappedCookieWithHaloImage} alt="" className={styles.cookie} />

                        <Image src={controller.uiProduct.fruits[0]} alt="" className={classNames(styles.fruit, styles.fruit_0)} />
                        
                        <Image src={controller.uiProduct.fruits[0]} alt="" className={classNames(styles.fruit, styles.fruit_1)} />
                        
                        <Image src={controller.uiProduct.fruits[0]} alt="" className={classNames(styles.fruit, styles.fruit_2)} />
                        
                        <Image src={controller.uiProduct.fruits[0]} alt="" className={classNames(styles.fruit, styles.fruit_3)} />
                    </div>

                    <div className={styles.get_energy_reboost_area}>
                        <p>Energy Reboost</p>
                        
                        <button onClick={(event) => controller.underCookieGetYoursButtonClicked()} className={"button_yellow"}>GET YOURS</button>
                    </div>
                </div>
            </div>
        </section>
    );
};