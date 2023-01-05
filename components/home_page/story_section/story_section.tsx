import classNames from "classnames";
import { FC } from "react";
import Image from "next/image";
import styles from "./story_section_styles.module.scss";
import { halfOpenedStrawberryBarWithHaloImage } from "../../../common_imported_images/cookies";
import { plantImage0, plantImage1 } from "../../../common_imported_images/plants";

export const StorySection: FC = (props) => {
    return (
        <section className={classNames("light_theme", styles.story_section)}>
            <div className={styles.container}>
                <div className={styles.left_grid_cell}>
                    <h1>
                        <span className="personalized_text">Hello!</span>
                        
                        <br /><span className={styles.domain_color}>We're Wholy.</span>
                    </h1>

                    <p className={styles.description}>
                        We like to keep it simple here - We are here to inspire people to live their best lives!
                        We care about your health like it's our own!
                    </p>
                    
                    <p className={styles.strong_description}>
                        <strong>And so we created the most foolproof energy bar that even your mom can't say no to!</strong>
                    </p>

                    <p className={classNames("personalized_text", styles.personalized_message)}>
                        Few more reasons to be happy about while taking that yummy bite!
                    </p>

                    <button>SHOP NOW</button>
                </div>

                <div className={styles.right_grid_cell}>
                    <div className={styles.cookie_container}>
                        <Image src={plantImage1} alt="" className={styles.plant} />

                        <Image src={halfOpenedStrawberryBarWithHaloImage} alt="" className={styles.cookie} />
                    </div>
                </div>
            </div>
        </section>
    );
};