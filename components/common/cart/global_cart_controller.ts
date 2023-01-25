import { Context, Dispatch, SetStateAction, createContext } from "react";

export interface GlobalCartController {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const GlobalCartControllerContext = createContext<GlobalCartController | null>(null);