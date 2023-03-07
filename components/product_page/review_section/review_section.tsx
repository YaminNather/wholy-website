import { FC } from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./review_section_styles.module.scss";

import sectionHeadingContainerImage from "../../../public/product/section-heading-container.png";
import reviewContainerImage from "../../../public/product/review-container.png";
import feedbackContainerImage from "../../../public/product/feedback-container.png";
import arrowImage from "../../../public/product/arrow.png";

import { yellowTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";
import { yellowPlant0Image } from "../../../common_imported_images/plants";

export const ReviewSection: FC = () => {
    return (
        <section id="review_section" className={classNames("light_theme", styles.review_section)}>
            <Image src={yellowTexturedBackgroundImage} alt="" className={"background_image"} />

            <Image src={yellowPlant0Image} alt="" className={classNames("background_prop", styles.top_left_plant)} />
            
            <Image src={yellowPlant0Image} alt="" className={classNames("background_prop", styles.bottom_right_plant)} />

            <div className={classNames("container", styles.container)}>
                <div className={styles.heading_area}>
                    <div className={styles.heading}>
                        <Image src={sectionHeadingContainerImage} alt="" className={styles.heading_container} />

                        <h1 className={"personalized_text"}>Reviews</h1>
                    </div>

                    <h1 className={styles.secondary_heading}>Our favourite part is reading your reviews!</h1>

                    <Image src={arrowImage} alt="" className={styles.arrow} />
                </div>

                <div className={styles.reviews_area}>
                    <div className={styles.review}>
                        <Image src={reviewContainerImage} alt="" className={styles.review_container} />
                        
                        {/* <Image src={reviewContainerTitleBarIconsImage} alt="" className={styles.review_container_title_bar_icons} /> */}

                        <div className={styles.content}>
                            <h1 className={"personalized_text"}>Review Title</h1>

                            <p className={styles.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae cum commodi vitae praesentium ab error, quaerat aliquam, similique fuga perferendis nulla doloribus, hic eveniet voluptate corrupti autem quis soluta? Vero?
                            </p>

                            <p className={styles.name}>
                                YAMIN NATHER
                            </p>
                        </div>
                    </div>
                    
                    <div className={styles.review}>
                        <Image src={reviewContainerImage} alt="" className={styles.review_container} />
                        
                        {/* <Image src={reviewContainerTitleBarIconsImage} alt="" className={styles.review_container_title_bar_icons} /> */}

                        <div className={styles.content}>
                            <h1 className={"personalized_text"}>Review Title</h1>

                            <p className={styles.description}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae cum commodi vitae praesentium ab error, quaerat aliquam, similique fuga perferendis nulla doloribus, hic eveniet voluptate corrupti autem quis soluta? Vero?
                            </p>

                            <p className={styles.name}>
                                YAMIN NATHER
                            </p>
                        </div>
                    </div>
                    
                    <div className={styles.feedback}>
                        <Image src={feedbackContainerImage} alt="" className={styles.feedback_container} />
                        
                        {/* <Image src={reviewContainerTitleBarIconsImage} alt="" className={styles.review_container_title_bar_icons} /> */}

                        <div className={styles.content}>
                            <h1>Write us a little love letter below</h1>

                            <div className={styles.bottom_area}>
                                <input placeholder="Name" />
                                
                                <input placeholder="Email" />

                                <textarea placeholder="Write your review" className={styles.review_field} />

                                <button>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};