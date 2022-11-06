import { FC } from "react";
import Image from "next/image";
import styles from "./brand_statement_section_styles.module.scss";
import classNames from "classnames";

import tearEffectImage from "../../../public/green-tear-effect.png";

export const BrandStatementSection: FC = (props) => {
    return (
        <section id="brand-statement" className={classNames("light_theme", styles.brand_statement_section)}>            
            <div className={classNames("container", styles.container)}>
                <h1>
                    We believe in 
                    <span>
                        exercise
                    </span> 
                     and a balanced diet, but we also believe you deserve a treat!
                </h1>

                <div className={styles.video} />
            </div>

            <Image src={tearEffectImage} alt="" className={classNames("tear_effect", styles.tear_effect)} />
        </section>
    );
};