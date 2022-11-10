import CartBridge from "./cart_bridge";

export abstract class Checkout {
    public constructor(cart: CartBridge) {
        this._cart = cart;
        cart.setOnChangeListener(() => this.onChangeListener?.());
    }

    public getCouponCodeDiscount(): number {
        return Checkout.couponCodeToPriceMap[this._couponCode] ?? 0.0;
    }

    public hasAboveHundredDiscount(): boolean {
        return this._cart.price >= 100.0;
    }

    public getShippingMethodCost(): number {
        return Checkout.shippingMethodToPriceMap[this._shippingMethod]!;
    }

    public abstract applyCoupon(couponCode: string): Promise<void>;

    public get totalPrice(): number {
        let r: number = this.cart.price - this.getCouponCodeDiscount();
        if(!this.hasAboveHundredDiscount()) {
            r += this.getShippingMethodCost();
        }
        
        return r;
    }

    public get cart(): CartBridge {
        return this._cart;
    }    

    public get couponCode(): string {
        return this._couponCode;
    }

    public get shippingMethod(): ShippingMethod {
        return this._shippingMethod;
    }
    
    public set shippingMethod(newValue: ShippingMethod) {
        this._shippingMethod = newValue;
        this.onChangeListener?.();
    }

    public setOnChangeListener(listener: ()=>void): void {
        this.onChangeListener = listener;
    }

    public removeOnChangeListener(): void {
        this.onChangeListener = undefined;
    }

    
    protected _cart: CartBridge;
    protected _couponCode: string = "";
    protected _shippingMethod: ShippingMethod = ShippingMethod.flatRate;

    protected onChangeListener?: ()=>void;


    protected static couponCodeToPriceMap: { [key: string]: number } = {
        "abc": 20.0,
        "123": 30.0
    };
    
    protected static shippingMethodToPriceMap: { [key: string]: number } = {
        "flatRate": 20,
        "expeditedShipping": 40,
        "overnightShipping": 60
    }; 
}

export enum ShippingMethod {
    flatRate = "flatRate",
    expeditedShipping = "expeditedShipping",
    overnightShipping = "overnightShipping"
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