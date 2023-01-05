import { FC } from "react";
import Image from "next/image";
import styles from "./call_to_action_section_styles.module.scss";
import { uiProducts } from "../../../product_ui_details/ui_products";
import { ProductCard } from "./product_card/product_card";
import classNames from "classnames";

export const CallToActionSection: FC = (props) => {
    return (
        <section id="call_to_action_section" className={styles.section}>
            <div className={classNames("container", styles.container)}>
                <div className={styles.grid}>
                    {uiProducts.map(
                        (value, index, array) => {
                            return (
                                <ProductCard uiProduct={uiProducts[0]} />
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
};