import { Context, Dispatch, SetStateAction, createContext } from "react";

export interface GlobalCartController {
    readonly isOpen: boolean;
    readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
    readonly addOnCloseListener: (listener: ()=>void)=>void;
    readonly removeOnCloseListener: (listener: ()=>void)=>void;
}

export const GlobalCartControllerContext = createContext<GlobalCartController | null>(null);