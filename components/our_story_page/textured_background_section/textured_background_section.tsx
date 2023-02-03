import { FC } from "react";
import Image from "next/image";
import styles from "./textured_background_section_styles.module.scss";

import { greenTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";
import classNames from "classnames";
import { YellowUnderline } from "../../text_highlighters/underline/underline";
import { YellowCircled } from "../../text_highlighters/circled/circled";
import { UIProducts } from "../../../product_ui_details/ui_products";

export const TexturedBackgroundSection: FC = (props) => {
    return (
        <section className={styles.textured_background_section}>
            <Image src={greenTexturedBackgroundImage} alt="" className={"background_image"} />

            <Image src={UIProducts.fig.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.right_fig)} />
            
            <Image src={UIProducts.blueberry.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.left_blueberry)} />
            
            <Image src={UIProducts.fig.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.left_fig)} />

            <div className={classNames("container", styles.container)}>
                <h1>
                    <YellowUnderline>Welcome to Wholy!</YellowUnderline>
                </h1>

                <p>
                    We make snacks that are 
                    &nbsp;<span className={"personalized_text"}>everything but a compromise!</span>
                    <br />
                    <br />
                    Amongst all that chaos and confusion that goes on in a day, our snacks are
                    made to help you <strong className={"personalized_text"}>take a moment for yourself and eat mindfully</strong>. We are on
                    a mission to create wholesome, honest, and meaningful products that inspire all
                    communities to live their best lives in the most <YellowCircled>wholesome</YellowCircled> way possible!
                </p>
            </div>
        </section>
    );
};