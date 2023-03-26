import { createContext } from "react";

export interface PaymentResultPageController {

}

export const PaymentResultPageControllerContext = createContext<PaymentResultPageController | null>(null);