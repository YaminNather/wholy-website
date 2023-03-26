import { PaymentIntent } from "@stripe/stripe-js";
import { IOpenPortalOptions, IPaymentService, PaymentStatus } from "./i_payment_service";

export class StripePaymentService implements IPaymentService {
    public openPortal(options: OpenPortalOptions): Promise<boolean | undefined> {

        const promise = new Promise<boolean | undefined>(
            (resolve, reject) => {
                const asyncPart = async (): Promise<void> => {
                    const broadcastChannel: BroadcastChannel = new BroadcastChannel("payment_result");
                                    
                    const paymentPortalUrl: string = `${window.location.protocol}//${window.location.host}/payment-portal?client_secret=${options.clientSecret}`;
                    window.open(paymentPortalUrl, "_blank")!.focus();

                    broadcastChannel.onmessage = (event: MessageEvent<PaymentStatus>) => {
                        if (event.data === PaymentStatus.cancelled) resolve(undefined);
                        else if (event.data === PaymentStatus.failed) reject("Payment failed");
                        else if (event.data === PaymentStatus.succeeded) resolve(true);
                        else throw new Error("Unknown payment status received");

                        broadcastChannel.close();
                    };
                }

                asyncPart();
            }
        );

        return promise;
    }

    public broadcastPaymentStatus(status: PaymentStatus): void {
        const broadcastChannel: BroadcastChannel = new BroadcastChannel("payment_result");
        broadcastChannel.postMessage(status);
    }
}

export class OpenPortalOptions extends IOpenPortalOptions {
    public constructor(clientSecret: string) {
        super();

        this._clientSecret = clientSecret;
    }

    public get clientSecret(): string {
        return this._clientSecret;
    }

    private _clientSecret: string;
}