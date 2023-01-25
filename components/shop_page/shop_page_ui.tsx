import { FC, useContext, useState } from "react";
import * as navBar from "../common/nav_bar/nav_bar";
import { NavBar } from "../common/nav_bar/nav_bar";
import { CatalogueSection } from "./catalogue_section/catalogue_section";
import { FooterSection } from "../common_sections/footer_section/footer_section";
import { GlobalCartController, GlobalCartControllerContext } from "../common/cart/global_cart_controller";
import { NavMenu } from "../common/nav_bar/nav_menu/nav_menu";

export const ShopPageUI: FC = (props) => {
    const globalCartController: GlobalCartController = useContext(GlobalCartControllerContext)!;
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    return (
        <>
            <NavBar 
                highlightedLink={navBar.Page.shop} 
                onOpenCartButtonClicked={() => globalCartController.setIsOpen(true)}
                onOpenNavMenuButtonClicked={() => setIsNavMenuOpen(true)}
             />

            <NavMenu isOpen={isNavMenuOpen} onCloseButtonClicked={() => setIsNavMenuOpen(false)} />

            <CatalogueSection />

            <FooterSection />
        </>
    );
};