import { NextPage } from "next";
import { BenefitsSection } from "../components/products_page/benefits_section/benefits_section";
import { DiscountSection } from "../components/common_sections/discount_section/discount_section";
import { HeaderSection } from "../components/common_sections/header_section/header_section";
import { ProductsCarouselSection } from "../components/products_page/products_carousel_section/products_carousel_section";

import greyTexturedBackgroundImage from "../public/grey-textured-background.png";
import { FooterSection } from "../components/common_sections/footer_section/footer_section";
import { NavMenu } from "../components/nav_menu/nav_menu";
import { AppBar } from "../components/app_bar/app_bar";
import { useState } from "react";

const ProductsPage: NextPage = () => {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    return (
        <>
            <AppBar isNavMenuOpen={isNavMenuOpen} onToggleNavMenuButtonPressed={(isOpen) => setIsNavMenuOpen(isOpen)} />

            <NavMenu isOpen={isNavMenuOpen} />

            <HeaderSection />

            <ProductsCarouselSection />

            <BenefitsSection />

            <DiscountSection titleColor="#f1ad35" backgroundImage={greyTexturedBackgroundImage} />

            <FooterSection />
        </>
    );
};

export default ProductsPage;