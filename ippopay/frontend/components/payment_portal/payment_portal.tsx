import { FC, useCallback } from "react";
import { Ippopay, ResponseHandler } from "react-ippopay";
import { useEffectClientSide } from "../../../../hooks/common/use_effect_client_side";

import styles from "./payment_portal_styles.module.scss";

export enum CompletionStatus {
    success,
    failed,
    cancelled
}

export interface PaymentPortalProps {
    readonly orderId: string;
    readonly publicKey: string;
    readonly onCompleted?: (status: CompletionStatus)=>void;
}

export const PaymentPortal: FC<PaymentPortalProps> = (props) => {
    const onCompleted = useCallback(
        (event: ResponseHandler): void => {
            if (event.data.status === "success") {
                props.onCompleted?.(CompletionStatus.success);
            }
            else if (event.data.status === "failure") {
                props.onCompleted?.(CompletionStatus.failed);
            }
        },
        [props.onCompleted]
    );

    useEffectClientSide(
        () => {
            window.addEventListener("message", onCompleted);

            return () => window.removeEventListener("message", onCompleted);
        }
    );

    return (
        <div className={styles.payment_portal_container}>
            <Ippopay ippopayClose={true} order_id={props.orderId} public_key={props.publicKey} />
        </div>
    );
};