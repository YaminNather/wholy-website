import { DocumentReference, DocumentSnapshot, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { PlaceOrderOptions, ShipRocketClient } from "../shiprocket/shiprocket_client";
import CartBridge from "./cart_bridge";
import { CartService } from "./cart_service";
import { CouponCodeBridge } from "./coupon_code_bridge";
import { DatabaseOrdersService } from "./database_orders_service";
import { FirebaseCouponCodeBridge } from "./firebase_coupon_code_bridge";
import FirebaseDatabaseOrdersService from "./firebase_database_orders_service";
import { FirebaseLastOrderedAddressBridge } from "./firebase_last_ordered_address_bridge";
import { StoredAddressBridge } from "./last_ordered_address_bridge";
import { OrderBridge, OrderStatus } from "./order_bridge";
import { CompleteCheckoutOptions } from "./orders_service";
import { getAuth } from "firebase/auth";
import { CouponCodeService } from "./coupon_code_service";
import { FirebaseCouponCodeService } from "./firebase_coupon_code_service";

export class CompleteCheckout {
    public constructor(options: CompleteCheckoutOptions) {
        this.options = options;
    }

    public async perform(): Promise<OrderBridge> {
        const order: OrderBridge = await this.databaseOrdersService.createOrderFromCheckout(this.options.checkout);
        
        await this.placeOrderInShiprocket(order.id);

        await order.pullFromDatabase();
        order.status = OrderStatus.paymentDone;
        await order.saveToDatabase();

        const cartService: CartService = new CartService();
        const cart: CartBridge = await cartService.getCart();
        await cart.pullDatabaseInfo();
        await cart.clear();

        const storedAddress: StoredAddressBridge = new FirebaseLastOrderedAddressBridge();
        await storedAddress.pullFromDatabase();
        storedAddress.address = this.options.address;
        await storedAddress.saveToDatabase();

        if (this.options.checkout.isUsingCouponCode) {
            const couponCode: CouponCodeBridge = new FirebaseCouponCodeBridge(this.options.checkout.couponCodeName);
            await couponCode.use();

            await this.couponCodeService.addToAppliedCouponCode(this.options.checkout.couponCodeName);            
        }

        return order;
    }

    private async placeOrderInShiprocket(orderId: string): Promise<void> {
        let productCount: number = 0;
        for (const cartItem of this.options.checkout.cart.cartItems) {
            productCount += cartItem.itemCount;
        }

        const placeOrderOptions: PlaceOrderOptions = {
            orderId: orderId,
            firstName: this.options.firstName,
            lastName: this.options.lastName,
            billingDetails: {
                address: {
                    streetAddress: `${this.options.address.streetAddress0}, ${this.options.address.streetAddress1}`,
                    city: this.options.address.city,
                    state: this.options.address.state,
                    pinCode: this.options.address.pinCode
                },
                email: this.options.email,
                phone: this.options.phone,
            },
            dimensions: {
                length: 20,
                breadth: 10,
                height: 50 * productCount,
                weight: productCount * 0.05
            },
            products: this.options.checkout.cart.cartItems.map(
                (value, index, array) => {
                    return {
                        sku: value.product.id,
                        name: value.product.name,
                        sellingPrice: value.product.price * value.itemCount,
                        units: value.itemCount
                    };
                }
            ),
            subTotal: this.options.checkout.totalPrice
        };
        await this.shipRocketClient.placeOrder(placeOrderOptions);
    }    



    private options: CompleteCheckoutOptions;

    private databaseOrdersService: DatabaseOrdersService = new FirebaseDatabaseOrdersService();
    private couponCodeService: CouponCodeService = new FirebaseCouponCodeService();
    private shipRocketClient: ShipRocketClient = new ShipRocketClient();
}