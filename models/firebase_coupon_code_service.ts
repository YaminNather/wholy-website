import { DocumentSnapshot, doc, getDoc, getFirestore } from "firebase/firestore";
import { CouponCodeService } from "./coupon_code_service";

export class FirebaseCouponCodeService implements CouponCodeService {
    public async doesCouponCodeExist(couponCode: string): Promise<boolean> {
        const snapshot: DocumentSnapshot = await getDoc(doc(getFirestore(), "couponCodes", couponCode));

        return snapshot.exists();
    }
}