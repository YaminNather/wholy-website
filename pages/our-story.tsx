import { NextPage } from "next";
import { TopSection } from "../components/our_story_page/top_section/top_section";
import { TexturedBackgroundSection } from "../components/our_story_page/textured_background_section/textured_background_section";
import { FooterSection } from "../components/common_sections/footer_section/footer_section";

import * as navBar from "../components/common/nav_bar/nav_bar";
import { NavBar } from "../components/common/nav_bar/nav_bar";

const OurStoryPage: NextPage = (props) => {
    return (
        <>
            <NavBar highlightedLink={navBar.Page.ourStory} />

            <TopSection />

            <TexturedBackgroundSection />

            <FooterSection />
        </>
    );
};

export default OurStoryPage;
