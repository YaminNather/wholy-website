import { FC, PropsWithChildren, useState } from "react";
import { LoadingIndicatorModal } from "../loading_indicator_modal/loading_indicator_modal";
import { loadingIndicatorModalWrapperDataContext } from "./loading_indicator_modal_wrapper_data";

export const LoadingIndicatorModalWrapper: FC<PropsWithChildren> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <loadingIndicatorModalWrapperDataContext.Provider value={{isLoading: isLoading, setIsLoading: setIsLoading}}>
            <LoadingIndicatorModal isVisible={isLoading} />

            {props.children}
        </loadingIndicatorModalWrapperDataContext.Provider>
    );
};