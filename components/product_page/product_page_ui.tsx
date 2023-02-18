import { FC } from "react";
import { TopSection } from "./top_section/top_section";
import * as nav_bar from "../common/nav_bar/nav_bar";
import { NavBarSystem } from "../common/nav_bar/nav_bar_system";
import { IngredientsSection } from "./ingredients_section/ingredients_section";
import { CallToActionSection } from "./call_to_action_section/call_to_action_section";
import { UniqueSellingPointsSection } from "./unique_selling_points_section/unique_selling_points_section";
import { FooterSection } from "../common_sections/footer_section/footer_section";

export const ProductPageUI: FC = (props) => {
    return (
        <>
            <NavBarSystem colorScheme={nav_bar.ColorScheme.light} />

            <TopSection />

            <IngredientsSection />

            <UniqueSellingPointsSection />

            <CallToActionSection />

            <FooterSection />
        </>
    );
}