import { NextPage } from "next";

import { FooterSection } from "../components/common_sections/footer_section/footer_section";
import { useCallback, useContext, useState } from "react";
import * as navbar from "../components/common/nav_bar/nav_bar";
import { NavBar } from "../components/common/nav_bar/nav_bar";
import { HeroSection } from "../components/home_page/hero_section/hero_section";
import { StorySection } from "../components/home_page/story_section/story_section";
import { UniqueSellingPointsSection } from "../components/home_page/unique_selling_points_section/unique_selling_points_section";
import { CallToActionSection } from "../components/home_page/call_to_action_section/call_to_action_section";
import { FollowUsSection } from "../components/home_page/follow_us_section/follow_us_section";
import { NavMenu } from "../components/common/nav_bar/nav_menu/nav_menu";
import { GlobalCartController, GlobalCartControllerContext } from "../components/common/cart/global_cart_controller";

export const HomePage: NextPage = () => {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
    const globalCartController: GlobalCartController = useContext(GlobalCartControllerContext)!;

    const openCart = useCallback(
        (): void => globalCartController.setIsOpen(true),
        [globalCartController]
    );

    const openCartFromNavMenu = useCallback(
        (): void => {
            openCart();
            setIsNavMenuOpen(false);
        },
        [openCart]
    );

    return (
        <>
            <NavBar
                highlightedLink={navbar.Page.home}
                onOpenNavMenuButtonClicked={() => setIsNavMenuOpen(true)} 
                onOpenCartButtonClicked={openCart}
            />

            <NavMenu isOpen={isNavMenuOpen} onOpenCartButtonClicked={openCartFromNavMenu} onCloseButtonClicked={() => setIsNavMenuOpen(false)} />

            <HeroSection />

            <StorySection />

            <UniqueSellingPointsSection />

            <CallToActionSection />

            <FollowUsSection />

            <FooterSection />
        </>
    );
};

export default HomePage;