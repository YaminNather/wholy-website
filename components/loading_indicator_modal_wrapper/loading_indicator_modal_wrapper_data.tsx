import { createContext, Dispatch, SetStateAction } from "react";
import { Context } from "vm";

export interface LoadingIndicatorModalWrapperData {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const loadingIndicatorModalWrapperDataContext = createContext<LoadingIndicatorModalWrapperData | null>(null);