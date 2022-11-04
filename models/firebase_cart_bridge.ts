import { getAuth, User } from "firebase/auth";
import { doc, DocumentSnapshot, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { NotSignedInError } from "../errors";
import FirebaseProductRepository from "../repository/firebase_product_repository";
import CartBridge from "./cart_bridge";
import CartItem from "./cart_item";

export default class FirebaseCartBridge extends CartBridge {
    public constructor() {
        super(new FirebaseProductRepository());
    }

    public async pullDatabaseInfo(): Promise<void> {
        const currentUser: User | null = getAuth().currentUser;
        if(currentUser === null) throw new NotSignedInError();

        const documentSnapshot: DocumentSnapshot = await getDoc(doc(this.firestore, FirebaseCartBridge.collectionName, currentUser.uid));

        if(!documentSnapshot.exists()) {
            this.id = currentUser.uid;
            this.cartItems = {};
            return;
        }

        this.id = this.id;
        this.cartItems = {};
        for(const productId of Object.keys(documentSnapshot.get("products"))) {
            const product = await this.productRepository.getProduct(productId);
            this.cartItems[productId] = new CartItem(product, documentSnapshot.get("products")[productId]);
        }
    }

    public async updateDatabase(): Promise<void> {
        console.log("CustomLog: Updating Database");
        const currentUser: User | null = getAuth().currentUser;
        if(currentUser === null) throw new NotSignedInError();
        
        let productsToQuantityMap: { [key: string]: number } = {};
        for(const cartItem of Object.values(this.cartItems!)) {
            productsToQuantityMap[cartItem.product.id] = cartItem.itemCount;
        }
        
        const data: any = {
            products: productsToQuantityMap
        };
        
        await setDoc(doc(this.firestore, FirebaseCartBridge.collectionName, currentUser.uid), data);
        console.log("CustomLog: Updated Database");
    }


    private readonly firestore = getFirestore();

    private static readonly collectionName: string = "carts";
}