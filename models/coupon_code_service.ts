export abstract class CouponCodeService {
    public abstract doesCouponCodeExist(couponCode: string): Promise<boolean>;

    public abstract didAlreadyApplyCouponCode(couponCode: string): Promise<boolean>;

    public abstract addToAppliedCouponCode(couponCode: string): Promise<void>;
}