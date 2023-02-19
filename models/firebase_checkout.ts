import { getAuth } from "firebase/auth";
import { doc, DocumentReference, DocumentSnapshot, Firestore, getDoc, getFirestore } from "firebase/firestore";
import { Checkout, CouponAlreadyUsedException, CouponWithCodeNotAvailableException } from "./checkout";

export class FirebaseCheckout extends Checkout {
    public async applyCoupon(applyingCode: string): Promise<void> {
        if(!Checkout.couponCodeToPriceMap.has(applyingCode)) {
            throw new CouponWithCodeNotAvailableException(applyingCode);
        }

        const documentReference: DocumentReference = doc(getFirestore(), "appliedCouponCodes", getAuth().currentUser!.uid);
        const documentSnapshot: DocumentSnapshot = await getDoc(documentReference);

        let didAlreadyApplyCode: boolean;
        if(!documentSnapshot.exists()) {
            didAlreadyApplyCode = false;
        }
        else {
            const appliedCodes: string[] = documentSnapshot.get("values");
            didAlreadyApplyCode = appliedCodes.findIndex((value) => value === applyingCode) !== -1;
        }
        
        if(didAlreadyApplyCode) throw new CouponAlreadyUsedException(applyingCode);

        this._couponCode = applyingCode;

        this.onChangeListener?.();
    }
}