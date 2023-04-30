export abstract class CouponCodeService {
    public abstract doesCouponCodeExist(couponCode: string): Promise<boolean>;
}