import { FC, PropsWithChildren, useCallback, useRef, useState } from "react";
import { CompletionStatus, PaymentPortal } from "../payment_portal/payment_portal";
import { PaymentPortalProviderController, PaymentPortalProviderControllerContext } from "./payment_portal_provider_controller";

export interface PaymentPortalProviderProps extends PropsWithChildren {
    publicKey: string;
}

export const PaymentPortalProvider : FC<PaymentPortalProviderProps> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const openResolveRef = useRef<( (value: CompletionStatus)=>void ) | null>(null);
    const openRejectRef = useRef<( (reason: any)=>void ) | null>(null);

    const open = useCallback(
        (orderId: string): Promise<CompletionStatus> => {
            const r: Promise<CompletionStatus> = new Promise<CompletionStatus>(
                (resolve, reject) => {
                    if (isOpen) return;

                    setOrderId(orderId);                    
                    setIsOpen(true);

                    openResolveRef.current = resolve;
                    openRejectRef.current = reject;
                }
            );
            
            return r;
        },
        [isOpen]
    );

    const close = useCallback(
        (): void => {
            if (!isOpen) return;

            setIsOpen(false);
            setOrderId(null);
        },
        [isOpen]
    );

    const onCompleted = useCallback(
        (status: CompletionStatus): void => {
            if (status !== CompletionStatus.failed) openResolveRef.current?.(status);
            else openRejectRef.current?.(status);            

            setOrderId(null);
            setIsOpen(false);
            
            openResolveRef.current = null;
            openRejectRef.current = null;
        },
        []
    );

    const controller: PaymentPortalProviderController = {
        open: open,
        close: close,
        isOpen: isOpen
    };

    return (
        <PaymentPortalProviderControllerContext.Provider value={controller}>
            {(isOpen) ? 
                <PaymentPortal orderId={orderId as string} publicKey={props.publicKey} onCompleted={onCompleted} />
                : <></>
            }

            {props.children}
        </PaymentPortalProviderControllerContext.Provider>
    );
}