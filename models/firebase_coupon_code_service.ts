import { DocumentReference, DocumentSnapshot, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { CouponCodeService } from "./coupon_code_service";
import { getAuth } from "firebase/auth";
import { AppliedCouponDetails, CouponAlreadyUsedException } from "./checkout";

export class FirebaseCouponCodeService implements CouponCodeService {
    public async doesCouponCodeExist(couponCode: string): Promise<boolean> {
        const snapshot: DocumentSnapshot = await getDoc(doc(getFirestore(), "couponCodes", couponCode));

        return snapshot.exists();
    }

    public async didAlreadyApplyCouponCode(couponCode: string): Promise<boolean> {
        const documentReference: DocumentReference = doc(getFirestore(), "appliedCouponCodes", getAuth().currentUser!.uid);
        const documentSnapshot: DocumentSnapshot = await getDoc(documentReference);

        let r: boolean;
        if(!documentSnapshot.exists()) {
            r = false;
        }
        else {
            const appliedCodes: string[] = documentSnapshot.get("values");
            r = appliedCodes.findIndex((value) => value === couponCode) !== -1;
        }

        return r;
    }

    public async addToAppliedCouponCode(couponCode: string): Promise<void> {
        const documentReference: DocumentReference = doc(getFirestore(), "appliedCouponCodes", getAuth().currentUser!.uid);
        
        const documentSnapshot: DocumentSnapshot = await getDoc(documentReference);
        const appliedCodes: string[] = documentSnapshot.get("values") ?? [];
        
        appliedCodes.push(couponCode);
        
        await setDoc(documentReference, { values: appliedCodes });
    }
}