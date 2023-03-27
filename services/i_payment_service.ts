export abstract class IPaymentService {
    public abstract openPortal(options: IOpenPortalOptions): Promise<boolean | undefined>;

    public abstract broadcastPaymentStatus(status: PaymentStatus): void;
}

export enum PaymentStatus {
    succeeded, 
    failed, 
    cancelled
}

export abstract class IOpenPortalOptions {}