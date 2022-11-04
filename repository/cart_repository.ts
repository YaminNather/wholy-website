import FirebaseCartBridge from "../models/firebase_cart_bridge";

export default abstract class CartRepository {
    public abstract getCart(): Promise<FirebaseCartBridge>;

    public abstract storeCart(cart: FirebaseCartBridge): Promise<FirebaseCartBridge>;
}