import { Context, createContext } from "react";

export interface AccordionData {
    isExpanded: boolean;
}

export const accordionDataContext: Context<AccordionData> = createContext<AccordionData>({isExpanded: false});