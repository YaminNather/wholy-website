import { FC } from "react";
import Image from "next/image";
import styles from "./call_to_action_section_styles.module.scss";
import { UIProducts } from "../../../product_ui_details/ui_products";
import { ProductCard } from "./product_card/product_card";
import classNames from "classnames";
import { instagramLogoVector } from "../../../common_imported_images/social_media_logos";

export const CallToActionSection: FC = (props) => {
    return (
        <section id="call_to_action_section" className={classNames("light_theme", styles.section)}>
            <div className={classNames("container", styles.container)}>
                <h1>Now that we got your attention, Go on! <strong>Grab a bite!</strong></h1>

                <div className={styles.grid}>
                    {UIProducts.array.map(
                        (value, index, array) => {
                            return (
                                <ProductCard uiProduct={value} />
                            );
                        }
                    )}
                </div>

                <button>SHOP OUR RANGE</button>

                {/* <div className={styles.heading_area}>
                    <h1>We dont mind you stalking us!</h1>

                    <div className={styles.instagram_handle_area}>
                        <div className={styles.logo_container}>
                            <Image src={instagramLogoVector} alt="" />
                        </div>
                        
                        <p>@insta_handle</p>
                    </div>
                </div> */}
            </div>
        </section>
    );
};