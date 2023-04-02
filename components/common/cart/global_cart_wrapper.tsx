import { FC, PropsWithChildren, useCallback, useRef, useState } from "react";
import { Cart } from "./cart";
import { GlobalCartControllerContext } from "./global_cart_controller";

import styles from "./global_cart_wrapper_styles.module.scss";

export const GlobalCartWrapper: FC<PropsWithChildren> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onCloseListeners = useRef<(()=>void)[]>([]);

    const addOnCloseListener = useCallback(
        (listener: ()=>void): void => {
            onCloseListeners.current.push(listener);
        },
        []
    );
    
    const removeOnCloseListener = useCallback(
        (listener: ()=>void): void => {
            const listenerIndex: number = onCloseListeners.current.indexOf(listener);
            
            if (listenerIndex === -1) return;
                        
            onCloseListeners.current.splice(listenerIndex, 1);
        },
        []
    );

    const onCloseButtonClicked = useCallback(
        (): void => {
            for (const listener of onCloseListeners.current) {
                listener();
            };

            setIsOpen(false);
        },
        []
    );

    return (
        <GlobalCartControllerContext.Provider value={{isOpen: isOpen, setIsOpen: setIsOpen, addOnCloseListener: addOnCloseListener, removeOnCloseListener: removeOnCloseListener}}>
            <div style={{display: (isOpen) ? undefined : "none"}} className={styles.barrier} />

            <Cart isOpen={isOpen} onCloseButtonClicked={onCloseButtonClicked} />

            {props.children}
        </GlobalCartControllerContext.Provider>
    );
};