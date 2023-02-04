import classNames from "classnames";
import { FC } from "react";
import Image from "next/image";
import styles from "./story_section_styles.module.scss";
import halfWrappedCookieImage from "../../../public/home/our-story/half-wrapped-cookie.png";

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
                        We like to keep it simple here.
                        <br />We are here to inspire people to live their best lives!
                    </p>                    

                    <button>OUR STORY</button>
                </div>

                <div className={styles.right_grid_cell}>
                    <Image src={halfWrappedCookieImage} alt="" className={styles.cookie} />
                </div>
            </div>
        </section>
    );
};