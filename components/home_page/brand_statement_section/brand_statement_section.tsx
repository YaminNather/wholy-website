import { FC } from "react";
import Image from "next/image";
import styles from "./brand_statement_section_styles.module.scss";
import classNames from "classnames";

import tearEffectImage from "../../../public/green-tear-effect.png";
import paintStrokeImage from "../../../public/paint-stroke.png";
import circleImage from "../../../public/home/brand-statement/circle.png";

export const BrandStatementSection: FC = (props) => {
    return (
        <section id="brand-statement" className={classNames("light_theme", styles.brand_statement_section)}>            
            <div className={classNames("container", styles.container)}>
                <h1>
                    We believe in
                    <span className={styles.overlayee}>
                        &nbsp;exercise

                        <Image src={circleImage} alt="" className={styles.circle} />
                    </span> 
                    &nbsp;and a balanced diet, but we also believe 
                    <br/><span className={styles.overlayee}>
                        &nbsp;you deserve a treat!
                        
                        <Image src={paintStrokeImage} alt="" className={styles.paint_stroke} />
                    </span>
                </h1>

                <div className={styles.video} />
            </div>

            <Image src={tearEffectImage} alt="" className={classNames("tear_effect", styles.tear_effect)} />
        </section>
    );
};