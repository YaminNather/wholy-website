import { DocumentReference, DocumentSnapshot, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { CouponCodeBridge } from "./coupon_code_bridge";

export class FirebaseCouponCodeBridge extends CouponCodeBridge {
    public async pullFromDatabase(): Promise<void> {        
        const documentSnapshot: DocumentSnapshot = await getDoc(this.documentReference);

        this._remaining = documentSnapshot.get("remaining");
        this._discount = documentSnapshot.get("discount");

        this.pulledFromDatabase = true;
    }
    
    public async updateDatabase(): Promise<void> {
        if (!this.pulledFromDatabase) return;
        
        const data: any = { 
            "remaining": this._remaining!,
        };
        await updateDoc(this.documentReference, data);
    }

    private get documentReference(): DocumentReference {
        return doc(getFirestore(), "couponCodes", this.name);
    }
}