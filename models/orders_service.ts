import { Checkout } from "./checkout";
import { OrderBridge } from "./order_bridge";
import { Address } from "./address";
import { CompleteCheckout } from "./complete_checkout";

export class OrdersService {
    public async completeCheckout(options: CompleteCheckoutOptions): Promise<OrderBridge> {
        const completeCheckout: CompleteCheckout = new CompleteCheckout(options);
        return await completeCheckout.perform();
    }
}

export interface CompleteCheckoutOptions {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: Address;
    checkout: Checkout;
}