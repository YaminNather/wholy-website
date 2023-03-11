import { createContext } from "react";
import { CompletionStatus } from "../payment_portal/payment_portal";

export interface PaymentPortalProviderController {
    open: (orderId: string)=>Promise<CompletionStatus>;
    close: ()=>void;
    isOpen: boolean;
}

export const PaymentPortalProviderControllerContext = createContext<PaymentPortalProviderController | undefined>(undefined);