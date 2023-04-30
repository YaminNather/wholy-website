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
        if ( await this.couponCodeService.doesCouponCodeExist(applyingCode) === false ) {
            throw new CouponWithCodeNotAvailableException(applyingCode);
        }

        const couponCode: CouponCodeBridge = new FirebaseCouponCodeBridge(applyingCode);
        await couponCode.pullFromDatabase();

        if (!couponCode.isAvailable()) throw new CouponWithCodeNotAvailableException(applyingCode);

        const didAlreadyApplyCode: boolean = await this.couponCodeService.didAlreadyApplyCouponCode(applyingCode);
        if (didAlreadyApplyCode) throw new CouponAlreadyUsedException(applyingCode);

        this.coupon = new AppliedCouponDetails(applyingCode, couponCode.discount);

        this.onChangeListener?.();
    }
}