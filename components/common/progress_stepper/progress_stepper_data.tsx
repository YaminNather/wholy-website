import { createContext } from "react";

export interface ProgressStepperData {
    currentStepIndex: number;
}

export const ProgressStepperDataContext = createContext<ProgressStepperData | null>(null);