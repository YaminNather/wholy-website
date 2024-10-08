import { NextPage } from "next";
import { BrandStatementSection } from "../components/home_page/brand_statement_section/brand_statement_section";
import { BrandTileSection } from "../components/home_page/brand_tile_section/brand_tile_section";
import { InspireSomeoneTodaySection } from "../components/home_page/inspire_someone_today_section/inspire_someone_today_section";
import { ProductInfoSection } from "../components/home_page/product_info_section/product_info_section";
import { DiscountSection } from "../components/common_sections/discount_section/discount_section";

import yellowTexturedBackgroundImage from "../public/yellow-textured-background.jpeg";
import { FooterSection } from "../components/common_sections/footer_section/footer_section";
import { useEffect, useMemo, useState } from "react";
import { NavBar } from "../components/common/nav_bar/nav_bar";
import { HeroSection } from "../components/home_page/hero_section/hero_section";

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
            <NavBar />

            <HeroSection />

            <InspireSomeoneTodaySection isRemoved={!isInspireSomeoneTodaySectionVisible} />

            <BrandTileSection />

            <BrandStatementSection />

            <ProductInfoSection />

            <DiscountSection backgroundImage={yellowTexturedBackgroundImage} />

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