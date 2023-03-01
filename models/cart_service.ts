import { User, getAuth } from "firebase/auth";
import CartBridge from "./cart_bridge";
import FirebaseCartBridge from "./firebase_cart_bridge";
import { NotSignedInError } from "../errors";

export class CartService {
    public async getCart(): Promise<CartBridge> {
        const user: User | null = getAuth().currentUser;
        
        if (user === null) return await this.getLocalCart();

        const r: CartBridge = new FirebaseCartBridge(user.uid);
        await r.pullDatabaseInfo();
        return r;
    }

    public async getLocalCart(): Promise<CartBridge> {
        let r: CartBridge;
        if (window.sessionStorage.getItem(CartService.localCartKeyName) === null) {
            r = new FirebaseCartBridge();
            await r.createNewCart();

            window.sessionStorage.setItem(CartService.localCartKeyName, r.id!);
        }
        else {
            r = new FirebaseCartBridge(window.sessionStorage.getItem(CartService.localCartKeyName)!);
            await r.pullDatabaseInfo();
        }

        return r;
    }    


    private static localCartKeyName: string = "localCart";
}