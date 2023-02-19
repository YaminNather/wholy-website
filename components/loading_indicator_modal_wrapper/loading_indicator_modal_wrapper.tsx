import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { LoadingIndicatorModal } from "../loading_indicator_modal/loading_indicator_modal";
import { loadingIndicatorModalWrapperDataContext } from "./loading_indicator_modal_wrapper_data";

import styles from "./loading_indicator_wrapper_styles.module.scss";

export const LoadingIndicatorModalWrapper: FC<PropsWithChildren> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [lastScrollAmount, setLastScrollAmount] = useState<number>();

    // const onScroll = useCallback(
    //     (event: Event) => {
    //         window.scrollTo({ top: lastScrollAmount });
    //     },
    //     [isLoading, lastScrollAmount]
    // );

    // useEffect(
    //     () => {
    //         if (isLoading) {
    //             window.addEventListener("scroll", onScroll);
    //             setLastScrollAmount(lastScrollAmount);
    //         }

    //         return window.removeEventListener("scroll", onScroll);
    //     },
    //     [isLoading, onScroll]
    // );

    return (
        <loadingIndicatorModalWrapperDataContext.Provider value={{isLoading: isLoading, setIsLoading: setIsLoading}}>
            <LoadingIndicatorModal 
                isVisible={isLoading} 
                className={styles.loading_indicator_modal}
                loaderClassName={styles.loader}
            />

            {props.children}
        </loadingIndicatorModalWrapperDataContext.Provider>
    );
};