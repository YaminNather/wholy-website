import { NextPage } from "next";
import { FooterSection } from "../components/common_sections/footer_section/footer_section";
import { CatalogueSection } from "../components/shop_page/catalogue_section/catalogue_section";

import * as navBar from "../components/common/nav_bar/nav_bar";
import { NavBar } from "../components/common/nav_bar/nav_bar";

const ShopPage: NextPage = () => {
    return (
        <>
            <NavBar highlightedLink={navBar.Page.shop} />

            <CatalogueSection />

            <FooterSection />
        </>
    );
};

export default ShopPage;