import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import classNames from "classnames";

import { NavBar } from "../common/nav_bar/nav_bar";
import { FooterSection } from "../common_sections/footer_section/footer_section";

import styles from "./legal_details_page_styles.module.scss";
import { greenTexturedBackgroundImage } from "../../common_imported_images/textured_backgrounds";

export const LegalDetailsPage: FC<PropsWithChildren> = (props) => {
    return (
        <>
            <NavBar />
            
            <div className={classNames(styles.legal_details_section)}>
                <Image src={greenTexturedBackgroundImage} alt="" className="background_image" />
                <div className="container">
                    {props.children}
                </div>
            </div>

            <FooterSection />
        </>
    );
};