import { FC, useCallback, useContext, useState } from "react";
import { NavBar, ColorScheme, Page } from "./nav_bar";
import { GlobalCartController, GlobalCartControllerContext } from "../cart/global_cart_controller";
import { NavMenu } from "./nav_menu/nav_menu";

export interface NavBarSystemProps {
    readonly colorScheme?: ColorScheme;
    readonly highlightedLink?: Page;
}

export const NavBarSystem: FC<NavBarSystemProps> = (props) => {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
    const globalCartController: GlobalCartController = useContext(GlobalCartControllerContext)!;

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
                colorScheme={props.colorScheme}
                highlightedLink={Page.home}
                onOpenNavMenuButtonClicked={() => setIsNavMenuOpen(true)} 
                onOpenCartButtonClicked={openCart}
            />

            <NavMenu isOpen={isNavMenuOpen} onOpenCartButtonClicked={openCartFromNavMenu} onCloseButtonClicked={() => setIsNavMenuOpen(false)} />
        </>
    );
}