import { NextPage } from "next";
import { NavBar } from "../components/common/nav_bar/nav_bar";
import { FooterSection } from "../components/common_sections/footer_section/footer_section";
import { CatalogueSection } from "../components/shop_page/catalogue_section/catalogue_section";
import { NavBarLink } from "../components/common/nav_bar/nav_bar_link";

const ShopPage: NextPage = () => {
    return (
        <>
            <NavBar highlightedLink={NavBarLink.shop} />

            <CatalogueSection />

            <FooterSection />
        </>
    );
};

export default ShopPage;