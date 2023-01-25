import { FC } from "react";
import Image from "next/image";
import styles from "./footer_section_styles.module.scss";
import classNames from "classnames";

import backgroundImage from "../../../public/green-textured-background.png";
import companyLogoImage from "../../../public/company-logo.svg";

import greenLeavesImage from "../../../public/plant-0.png";

import yellowLineImage from "../../../public/yellow-line.png";
import { UIProducts } from "../../../product_ui_details/ui_products";
import { SocialMediaLink } from "./social_media_link";
import { socialMediaLogos } from "../../../common_imported_images/social_media_logos";
import { YellowStrikeThrough } from "../../text_highlighters/strike_through/strike_through";

export const FooterSection: FC = (props) => {
    return (
        <section id="footer" className={styles.footer_section}>
            <Image src={backgroundImage} alt="" className={"background_image"} />

            {/* <Image src={yellowLeavesImage} alt="" className={classNames("background_prop", styles.yellow_leaves)} /> */}
            
            <Image src={greenLeavesImage} alt="" className={classNames("background_prop", styles.top_right_green_leaves)} />
            
            <Image src={UIProducts.blueberry.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.top_left_fruit)} />
            
            <Image src={UIProducts.fig.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.top_left_fruit, styles.fig)} />
            
            <Image src={UIProducts.fig.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.top_right_fruit)} />

            <Image src={UIProducts.strawberry.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.bottom_right_fruit)} />
            
            <Image src={UIProducts.strawberry.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.bottom_right_fruit, styles.strawberry_1)} />

            <Image src={greenLeavesImage} alt="" className={classNames("background_prop", styles.bottom_left_green_leaves)} />
            
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={classNames(styles.grid_cell, styles.first_grid_cell)}>
                        <Image src={companyLogoImage} alt="" className={styles.company_logo} />

                        <hr />

                        <div className={styles.contact_details_area}>
                            <ContactDetail heading={"We're only a call away"} value={"(+91) 98765 43210"} />
                            
                            <ContactDetail heading={"Shy and would rather email us?"} value={"hello@eatwholy.com"} />
                        </div>
                    </div>

                    <div className={classNames(styles.grid_cell, styles.second_grid_cell)}>                    
                        <div className={styles.back_to_top_button_area}>
                            <p className={styles.message}>
                                <YellowStrikeThrough>You've got a long way to slide.</YellowStrikeThrough>
                            </p>
                            
                            <button className="button_yellow" onClick={(event) => window.scrollTo(0, 0)}>BACK TO TOP</button>
                        </div>

                        <div className={styles.forms_area}>
                            <div className={styles.input_with_label_area}>
                                <label>Sign up for our newsletters</label>

                                <div className={styles.input_area}>
                                    <input placeholder="EMAIL" />
                                    
                                    <button className={classNames("button_outline")}>SUBMIT</button>
                                </div>

                                <p className={classNames("personalized_text", styles.personalized_text)}>We promise they're exciting!</p>
                            </div>

                            <div className={styles.input_with_label_area}>
                                <label>Drop us your pin code and check delivery</label>

                                <div className={styles.input_area}>
                                    <input placeholder="PINCODE" />
                                    
                                    <button className={classNames("button_outline")}>SUBMIT</button>
                                </div>

                                <p className={classNames("personalized_text", styles.personalized_text)}>We want everybody to get their hands on us!</p>
                            </div>
                        </div>

                        {/* <div className={styles.bottom_area}>
                            <p>T{"&"}C</p>
                            
                            <p>PRIVACY POLICY</p>
                            
                            <p>ALL RIGHTS RESERVED, EARLYBIRD FOOD AG, 2017</p>
                        </div> */}
                    </div>
                </div>

                <div className={styles.social_media_links_area}>
                    {socialMediaLogos.map( (image, index, array) => <SocialMediaLink image={image} className={styles.social_media_link} /> )}
                </div>
            </div>
        </section>
    );
};

export interface ContactDetailProps {
    heading: string;
    value: string;
}

export const ContactDetail: FC<ContactDetailProps> = (props) => {
    return (
        <div className={styles.contact_detail}>
            <h6 className={"personalized_text"}>
                {props.heading}

                <Image src={yellowLineImage} alt="" />
            </h6>

            <p>{props.value}</p>
        </div>
    );
}