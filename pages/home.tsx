import { NextPage } from "next";

import { FooterSection } from "../components/common_sections/footer_section/footer_section";
import { useEffect, useMemo, useState } from "react";
import { NavBar } from "../components/common/nav_bar/nav_bar";
import { HeroSection } from "../components/home_page/hero_section/hero_section";
import { StorySection } from "../components/home_page/story_section/story_section";
import { UniqueSellingPointsSection } from "../components/home_page/unique_selling_points_section/unique_selling_points_section";
import { CallToActionSection } from "../components/home_page/call_to_action_section/call_to_action_section";
import { FollowUsSection } from "../components/home_page/follow_us_section/follow_us_section";
import { NavBarLink } from "../components/common/nav_bar/nav_bar_link";

export const HomePage: NextPage = () => {
    const isInspireSomeoneTodaySectionVisible = useMemo(
        (): boolean => {
            if(typeof(window) === "undefined") return false;

            return localStorage.getItem("visited") === null;
        },
        []
    );    

    return (
        <>
            <NavBar highlightedLink={NavBarLink.home} />

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

function useIsFirstRender(): boolean {
    const [firstRender, setFirstRender] = useState<boolean>(true);

    useEffect(() => setFirstRender(false), []);

    return firstRender;
}