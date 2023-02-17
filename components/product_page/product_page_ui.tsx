import { FC, useContext } from "react";
import { TopSection } from "./top_section/top_section";
import * as nav_bar from "../common/nav_bar/nav_bar";
import { NavBarSystem } from "../common/nav_bar/nav_bar_system";
import { IngredientsSection } from "./ingredients_section/ingredients_section";

export const ProductPageUI: FC = (props) => {
    return (
        <>
            <NavBarSystem colorScheme={nav_bar.ColorScheme.light} />

            <TopSection />

            <IngredientsSection />
        </>
    );
}