import CartBridge from "./cart_bridge";
import { CouponCodeBridge } from "./coupon_code_bridge";
import { CouponCodeService } from "./coupon_code_service";
import { FirebaseCouponCodeBridge } from "./firebase_coupon_code_bridge";

export abstract class Checkout {
    public constructor(cart: CartBridge, couponCodeService: CouponCodeService) {
        this._cart = cart;
        this.couponCodeService = couponCodeService;
        cart.setOnChangeListener(() => this.onChangeListener?.());
    }

    public getCouponCodeDiscount(): number {
        if (this.coupon === undefined) throw new CouponNotAppliedException();

        return this.coupon!.discount;
    }

    public hasAboveHundredDiscount(): boolean {
        return this._cart.price >= 100.0;
    }

    public getShippingMethodCost(): number {
        return 20.0;
    }

    public getShippingDiscount(): number {
        return (this.cart.price >= 100.0) ? 20.0 : 0.0;
    }

    public abstract applyCoupon(couponCode: string): Promise<void>;

    public get totalPrice(): number {
        let r: number = this.cart.price - this.getCouponCodeDiscount();
        r += this.getShippingMethodCost();
        r -= this.getShippingDiscount();
        
        return r;
    }

    public get cart(): CartBridge {
        return this._cart;
    }    

    public get couponCodeName(): string {
        if (this.couponCodeName === undefined) throw new CouponNotAppliedException();

        return this.coupon!.name;
    }


    public setOnChangeListener(listener: ()=>void): void {
        this.onChangeListener = listener;
    }

    public removeOnChangeListener(): void {
        this.onChangeListener = undefined;
    }

    
    protected _cart: CartBridge;
    protected coupon?: AppliedCouponDetails;

    protected onChangeListener?: ()=>void;

    protected couponCodeService: CouponCodeService;
}

export class AppliedCouponDetails {
    public constructor(name: string, discount: number) {
        this.name = name;
        this.discount = discount;
    }


    public readonly name: string;
    public readonly discount: number;
}

export class CouponWithCodeNotAvailableException extends Error {
    public constructor(code: string) {
        super(`Coupon with code ${code} not available`);
    }
}

export class CouponNotAppliedException extends Error {}

export class CouponAlreadyUsedException extends Error {
    public constructor(code: string) {
        super(`Coupon with code ${code} already exists`);
    }
}