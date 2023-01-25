import { NextPage } from "next";
import { TopSection } from "../components/our_story_page/top_section/top_section";
import { TexturedBackgroundSection } from "../components/our_story_page/textured_background_section/textured_background_section";
import { FooterSection } from "../components/common_sections/footer_section/footer_section";

import * as navBar from "../components/common/nav_bar/nav_bar";
import { NavBar } from "../components/common/nav_bar/nav_bar";
import { useContext, useState } from "react";
import { NavMenu } from "../components/common/nav_bar/nav_menu/nav_menu";
import { GlobalCartController, GlobalCartControllerContext } from "../components/common/cart/global_cart_controller";

const OurStoryPage: NextPage = (props) => {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
    const globalCartController: GlobalCartController = useContext(GlobalCartControllerContext)!;

    return (
        <>
            <NavBar 
                highlightedLink={navBar.Page.ourStory} 
                onOpenNavMenuButtonClicked={() => setIsNavMenuOpen(true)}
                onOpenCartButtonClicked={() => globalCartController.setIsOpen(true)}
             />

            <NavMenu isOpen={isNavMenuOpen} onCloseButtonClicked={() => setIsNavMenuOpen(false)} />

            <TopSection />

            <TexturedBackgroundSection />

            <FooterSection />
        </>
    );
};

export default OurStoryPage;
