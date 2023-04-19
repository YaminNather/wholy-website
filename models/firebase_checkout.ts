import { getAuth } from "firebase/auth";
import { doc, DocumentReference, DocumentSnapshot, getDoc, getFirestore } from "firebase/firestore";
import { AppliedCouponDetails, Checkout, CouponAlreadyUsedException, CouponWithCodeNotAvailableException } from "./checkout";
import { FirebaseCouponCodeBridge } from "./firebase_coupon_code_bridge";
import CartBridge from "./cart_bridge";
import { FirebaseCouponCodeService } from "./firebase_coupon_code_service";
import { CouponCodeBridge } from "./coupon_code_bridge";

export class FirebaseCheckout extends Checkout {
    public constructor(cartBridge: CartBridge) {
        super(cartBridge, new FirebaseCouponCodeService());
    }

    public async applyCoupon(applyingCode: string): Promise<void> {
        if( await this.couponCodeService.doesCouponCodeExist(applyingCode) ) {
            throw new CouponWithCodeNotAvailableException(applyingCode);
        }

        const couponCode: CouponCodeBridge = new FirebaseCouponCodeBridge(applyingCode);
        await couponCode.pullFromDatabase();

        if (!couponCode.isAvailable()) throw new CouponWithCodeNotAvailableException(applyingCode);

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

        this.coupon = new AppliedCouponDetails(applyingCode, couponCode.discount);

        this.onChangeListener?.();
    }
}