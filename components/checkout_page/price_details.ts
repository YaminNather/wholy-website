export interface PriceDetails {
    cartPrice: number,
    couponCode?: string;
    couponCodeDiscountPrice: number;
    shippingCost: number;
    totalPrice: number;
}

export function createEmptyPriceDetails(): PriceDetails {
    return {
        cartPrice: 0,
        couponCode: undefined,
        couponCodeDiscountPrice: 0,
        shippingCost: 0,
        totalPrice: 0
    };
}