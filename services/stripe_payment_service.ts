import { DocumentReference, addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import { IOpenPortalOptions, IPaymentService, PaymentStatus } from "./i_payment_service";

export class StripePaymentService implements IPaymentService {
    public openPortal(options: OpenPortalOptions): Promise<boolean | undefined> {

        const promise = new Promise<boolean | undefined>(
            (resolve, reject) => {
                const asyncPart = async (): Promise<void> => {
                    const documentReference: DocumentReference = doc(getFirestore(), "payments", options.clientSecret);
                    await setDoc(documentReference, {  "status": "initiated" });
                                    
                    const paymentPortalUrl: string = `${window.location.protocol}//${window.location.host}/payment-portal?client_secret=${options.clientSecret}`;
                    window.open(paymentPortalUrl, "_blank")!.focus();

                    const unsubscriber = onSnapshot(
                        documentReference,
                        async (snapshot) => {
                            const status: string = snapshot.get("status");

                            if (status === "initiated") return;

                            if (status === "cancelled") {
                                return undefined;
                            }
                            else if (status === "failed") {
                                reject("Failed to make payment");
                            }
                            else if (status === "success") {
                                resolve(true);
                            }
                            
                            unsubscriber();
                            
                            await deleteDoc(documentReference);
                        }
                    );
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