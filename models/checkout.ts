import CartBridge from "./cart_bridge";

export abstract class Checkout {
    public constructor(cart: CartBridge) {
        this._cart = cart;
        cart.setOnChangeListener(() => this.onChangeListener?.());
    }

    public getCouponCodeDiscount(): number {
        return Checkout.couponCodeToPriceMap.get(this._couponCode) ?? 0.0;
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

    public get couponCode(): string {
        return this._couponCode;
    }


    public setOnChangeListener(listener: ()=>void): void {
        this.onChangeListener = listener;
    }

    public removeOnChangeListener(): void {
        this.onChangeListener = undefined;
    }

    
    protected _cart: CartBridge;
    protected _couponCode: string = "";

    protected onChangeListener?: ()=>void;


    protected static couponCodeToPriceMap: Map<string, number> = new Map<string, number>(
        [
            ["abc", 20.0],
            ["123", 30.0]
        ]
    );
}

export class CouponWithCodeNotAvailableException extends Error {
    public constructor(code: string) {
        super(`Coupon with code ${code} not available`);
    }
}

export class CouponAlreadyUsedException extends Error {
    public constructor(code: string) {
        super(`Coupon with code ${code} already used`);
    }
}