import { NextPage } from "next";
import { BrandStatementSection } from "../components/home_page/brand_statement_section/brand_statement_section";
import { BrandTileSection } from "../components/home_page/brand_tile_section/brand_tile_section";
import { InspireSomeoneTodaySection } from "../components/home_page/inspire_someone_today_section/inspire_someone_today_section";
import { ProductInfoSection } from "../components/home_page/product_info_section/product_info_section";
import { DiscountSection } from "../components/common_sections/discount_section/discount_section";

import yellowTexturedBackgroundImage from "../public/yellow-textured-background.jpeg";
import { FooterSection } from "../components/common_sections/footer_section/footer_section";
import { NavMenu } from "../components/nav_menu/nav_menu";
import { AppBar } from "../components/app_bar/app_bar";
import { useState } from "react";

export const HomePage: NextPage = () => {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    return (
        <>
            <AppBar isNavMenuOpen={isNavMenuOpen} onToggleNavMenuButtonPressed={(isOpen) => setIsNavMenuOpen(isOpen)} />

            <NavMenu isOpen={isNavMenuOpen} />

            {/* <InspireSomeoneTodaySection /> */}

            <BrandTileSection />

            <BrandStatementSection />

            <ProductInfoSection />

            <DiscountSection backgroundImage={yellowTexturedBackgroundImage} />

            <FooterSection />
        </>
    );
};

export default HomePage;

//