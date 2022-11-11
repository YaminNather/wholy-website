import { Checkout } from "./checkout";
import { OrderBridge } from "./order_bridge";

export abstract class DatabaseOrdersService {
    public abstract createOrderFromCheckout(checkout: Checkout): Promise<OrderBridge>;

    public abstract getAllOrders(): Promise<OrderBridge[]>
}