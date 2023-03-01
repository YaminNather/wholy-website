import { addDoc, collection, CollectionReference, doc, DocumentReference, DocumentSnapshot, getDoc, getFirestore, setDoc } from "firebase/firestore";
import FirebaseProductRepository from "../repository/firebase_product_repository";
import CartBridge, { IdNotSetError } from "./cart_bridge";
import CartItem from "./cart_item";
import Product from "./product";

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
            this.cartItems = new Map<string, CartItem>();
            return;
        }

        this.id = this.id;
        this.cartItems = new Map<string, CartItem>();
        for(const productId of Object.keys(documentSnapshot.get("products"))) {
            const product: Product = await this.productRepository.getProduct(productId);
            const cartItem: CartItem = new CartItem(product, documentSnapshot.get("products")[productId]);
            this.cartItems.set(productId, cartItem);
        }

        this.onChangeListener?.();
    }

    public async updateDatabase(): Promise<void> {
        let productsToQuantityMap: { [key: string]: number } = {};
        for(const cartItem of Array.from(this.cartItems!.values())) {
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