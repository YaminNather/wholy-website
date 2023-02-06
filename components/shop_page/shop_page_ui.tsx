import { FC, useCallback, useContext, useState } from "react";
import * as navBar from "../common/nav_bar/nav_bar";
import { NavBar } from "../common/nav_bar/nav_bar";
import { CatalogueSection } from "./catalogue_section/catalogue_section";
import { FooterSection } from "../common_sections/footer_section/footer_section";
import { GlobalCartController, GlobalCartControllerContext } from "../common/cart/global_cart_controller";
import { NavMenu } from "../common/nav_bar/nav_menu/nav_menu";

export const ShopPageUI: FC = (props) => {
    const globalCartController: GlobalCartController = useContext(GlobalCartControllerContext)!;
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    const openCart = useCallback(
        (): void => globalCartController.setIsOpen(true),
        [globalCartController]
    );

    const openCartFromNavMenu = useCallback(
        (): void => {
            openCart();
            setIsNavMenuOpen(false);
        },
        [openCart]
    );

    return (
        <>
            <NavBar
                colorScheme={navBar.ColorScheme.light}
                highlightedLink={navBar.Page.shop}
                onOpenNavMenuButtonClicked={() => setIsNavMenuOpen(true)}
                onOpenCartButtonClicked={openCart}
            />

            <NavMenu isOpen={isNavMenuOpen} onOpenCartButtonClicked={openCartFromNavMenu} onCloseButtonClicked={() => setIsNavMenuOpen(false)} />

            <CatalogueSection />

            <FooterSection />
        </>
    );
};