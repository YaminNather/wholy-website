import { Checkout } from "./checkout";
import { OrderBridge, OrderStatus } from "./order_bridge";
import { DatabaseOrdersService } from "./database_orders_service";
import { PlaceOrderOptions, ShipRocketClient } from "../shiprocket/shiprocket_client";
import FirebaseDatabaseOrdersService from "./firebase_database_orders_service";
import CartBridge from "./cart_bridge";
import FirebaseCartBridge from "./firebase_cart_bridge";
import { Address } from "./address";
import { StoredAddressBridge as StoredAddressBridge } from "./last_ordered_address_bridge";
import { FirebaseLastOrderedAddressBridge } from "./firebase_last_ordered_address_bridge";
import { DocumentReference, DocumentSnapshot, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export class OrdersService {
    public async completeCheckout(options: CompleteCheckoutOptions): Promise<OrderBridge> {
        const order: OrderBridge = await this.databaseOrdersService.createOrderFromCheckout(options.checkout);

        const placeOrderOptions: PlaceOrderOptions = {
            orderId: order.id,
            firstName: options.firstName,
            lastName: options.lastName,
            billingDetails: {
                address: {
                    streetAddress: `${options.address.streetAddress0}, ${options.address.streetAddress1}`,
                    city: options.address.city,
                    state: options.address.state,
                    pinCode: options.address.pinCode
                },
                email: options.email,
                phone: options.phone,
            },
            dimensions: {
                length: 20,
                breadth: 20,
                height: 20,
                weight: 20
            },
            products: Object.values(options.checkout.cart.cartItems!).map(
                (value, index, array) => {
                    return {
                        sku: value.product.id,
                        name: value.product.name,
                        sellingPrice: value.product.price * value.itemCount,
                        units: value.itemCount
                    };
                }
            ),
            subTotal: options.checkout.totalPrice
        };
        await this.shipRocketClient.placeOrder(placeOrderOptions);

        await order.pullFromDatabase();
        order.status = OrderStatus.paymentDone;
        await order.saveToDatabase();

        const cart: CartBridge = new FirebaseCartBridge();
        await cart.pullDatabaseInfo();
        await cart.clear();

        const storedAddress: StoredAddressBridge = new FirebaseLastOrderedAddressBridge();
        await storedAddress.pullFromDatabase();
        storedAddress.address = options.address;
        await storedAddress.saveToDatabase();

        if (options.checkout.couponCode !== "")
            await this.addToAppliedCouponCode(options.checkout.couponCode);

        return order;
    }

    private async addToAppliedCouponCode(couponCode: string): Promise<void> {
        const documentReference: DocumentReference = doc(getFirestore(), "appliedCouponCodes", getAuth().currentUser!.uid);
        
        const documentSnapshot: DocumentSnapshot = await getDoc(documentReference);
        const appliedCodes: string[] = documentSnapshot.get("values") ?? [];
        
        appliedCodes.push(couponCode);
        
        await setDoc(documentReference, { values: appliedCodes });
    }



    private databaseOrdersService: DatabaseOrdersService = new FirebaseDatabaseOrdersService();
    private shipRocketClient: ShipRocketClient = new ShipRocketClient();
}

export interface CompleteCheckoutOptions {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: Address;
    checkout: Checkout;
}