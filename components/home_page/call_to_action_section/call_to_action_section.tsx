import { FC } from "react";
import Image from "next/image";
import styles from "./call_to_action_section_styles.module.scss";
import { UIProducts } from "../../../product_ui_details/ui_products";
import { ProductCard } from "./product_card/product_card";
import classNames from "classnames";
import multiColoredWavesImage from "../../../public/home/call-to-action/multi-colored-waves.png";

export const CallToActionSection: FC = (props) => {
    return (
        <section id="call_to_action_section" className={classNames("light_theme", styles.section)}>

            <div className={classNames("container", styles.container)}>
                <h1>Now that we got your attention, Go on! <strong>Grab a bite!</strong></h1>
                <div className={styles.grid_area}>
                    <div className={styles.grid}>
                        {UIProducts.array.map(
                            (value, index, array) => {
                                return (
                                    <div className={styles.product_card_container}>
                                        <ProductCard uiProduct={value} />
                                    </div>
                                );
                            }
                        )}
                    </div>
                    
                    <Image src={multiColoredWavesImage} alt="" className={styles.multi_colored_waves} />
                </div>

                <button>SHOP OUR RANGE</button>
            </div>
        </section>
    );
};