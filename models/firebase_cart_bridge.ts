import { getAuth, User } from "firebase/auth";
import { addDoc, collection, CollectionReference, doc, DocumentReference, DocumentSnapshot, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { NotSignedInError } from "../errors";
import FirebaseProductRepository from "../repository/firebase_product_repository";
import CartBridge, { IdNotSetError } from "./cart_bridge";
import CartItem from "./cart_item";

export default class FirebaseCartBridge extends CartBridge {
    public constructor(id?: string) {
        super(new FirebaseProductRepository(), id);
    }

    public async createNewCart(): Promise<void> {
        const collectionReference: CollectionReference = collection(getFirestore(), `carts`);
        const data: { [ key: string ]: any } = {
            "products": {}
        };
        const documentReference: DocumentReference = await addDoc(collectionReference, data);

        this.id = documentReference.id;

        await this.pullDatabaseInfo();
    }

    public async pullDatabaseInfo(): Promise<void> {
        if (this.id === undefined) throw new IdNotSetError();

        const documentSnapshot: DocumentSnapshot = await getDoc(doc(this.firestore, FirebaseCartBridge.collectionName, this.id));

        if(!documentSnapshot.exists()) {
            this.cartItems = {};
            return;
        }

        this.id = this.id;
        this.cartItems = {};
        for(const productId of Object.keys(documentSnapshot.get("products"))) {
            const product = await this.productRepository.getProduct(productId);
            this.cartItems[productId] = new CartItem(product, documentSnapshot.get("products")[productId]);
        }

        this.onChangeListener?.();
    }

    public async updateDatabase(): Promise<void> {
        let productsToQuantityMap: { [key: string]: number } = {};
        for(const cartItem of Object.values(this.cartItems!)) {
            productsToQuantityMap[cartItem.product.id] = cartItem.itemCount;
        }
        
        const data: any = {
            products: productsToQuantityMap
        };
        
        await setDoc(doc(this.firestore, FirebaseCartBridge.collectionName, this.id!), data);
    }


    private readonly firestore = getFirestore();

    private static readonly collectionName: string = "carts";
}