import { FC, PropsWithChildren, useState } from "react";
import { Cart } from "./cart";
import { GlobalCartControllerContext } from "./global_cart_controller";

import styles from "./global_cart_wrapper_styles.module.scss";

export const GlobalCartWrapper: FC<PropsWithChildren> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);


    return (
        <GlobalCartControllerContext.Provider value={{isOpen: isOpen, setIsOpen: setIsOpen}}>
            <div style={{display: (isOpen) ? undefined : "none"}} className={styles.barrier} />

            <Cart isOpen={isOpen} onCloseButtonClicked={() => setIsOpen(false)} />

            {props.children}
        </GlobalCartControllerContext.Provider>
    );
};