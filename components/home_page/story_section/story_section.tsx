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

                    <hr />

                    <p className={styles.description}>
                        We like to keep it simple here - We are here to inspire people to live their best lives!
                    </p>                    

                    <button>OUR STORY</button>
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