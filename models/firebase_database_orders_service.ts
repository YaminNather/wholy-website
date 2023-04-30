import { Checkout } from "./checkout";
import { OrderBridge } from "./order_bridge";
import { DatabaseOrdersService } from "./database_orders_service";

import { addDoc, collection, DocumentReference, DocumentSnapshot, getDoc, getDocs, getFirestore, Query, query, QuerySnapshot, Timestamp, where } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { FirebaseOrderBridge } from "./firebase_order_bridge";
import OrderItem from "./order_item";
import ProductRepository from "../repository/product_repository";
import FirebaseProductRepository from "../repository/firebase_product_repository";
import Product from "./product";


export default class FirebaseDatabaseOrdersService extends DatabaseOrdersService {
    public async createOrderFromCheckout(checkout: Checkout): Promise<OrderBridge> {
        const user: User | null = getAuth().currentUser;
        
        if(user === null) throw new Error("User not logged in");

        const documentReference: DocumentReference = await addDoc(
            collection(getFirestore(), "orders"), 
            {
                "customer": user.uid,
                "items": checkout.cart.cartItems.map(
                    (value, index, array) => {
                        return {
                            "product": value.product.id,
                            "price": value.product.price,
                            "quantity": value.itemCount
                        };
                    }
                ),
                "status": "paymentPending",
                "orderedOn": Timestamp.now()
            }
        );

        const documentSnapshot: DocumentSnapshot = await getDoc(documentReference);

        return new FirebaseOrderBridge(documentSnapshot.id);
    }

    public async getAllOrders(): Promise<OrderBridge[]> {
        const user: User | null = getAuth().currentUser;
        if(user === null) throw new Error();

        const ordersQuery: Query = query(
            collection(getFirestore(), "orders"), 
            where("customer", "==", user.uid),
            where("status", "!=", "paymentPending")
        );
        const querySnapshot: QuerySnapshot = await getDocs(ordersQuery);

        const r: OrderBridge[] = [];
        
        const accquiredProducts: Map<string, Product> = new Map<string, Product>();
        for(let i: number = 0; i < querySnapshot.docs.length; i++) {
            const order: OrderBridge = await this.mapDocumentSnapshotToOrder(querySnapshot.docs[i], accquiredProducts);

            r.push(order);
        }

        return r;
    }

    private async mapDocumentSnapshotToOrder(documentSnapshot: DocumentSnapshot, accquiredProducts: Map<string, Product>): Promise<OrderBridge> {
        const itemsFirebase: any[] = documentSnapshot.get("items");
        const items: OrderItem[] = [];
        for(let i: number = 0; i < itemsFirebase.length; i++) {
            const itemFirebase: any = itemsFirebase[i];
            
            const productId: string = itemFirebase["product"];
            let product: Product;
            if (!accquiredProducts.has(productId)) {
                product = await this.productsRepository.getProduct(productId);
                accquiredProducts.set(productId, product);
            }
            else {
                product = accquiredProducts.get(productId)!;
            }

            const item: OrderItem = new OrderItem(
                product,
                itemFirebase["price"],
                itemFirebase["quantity"]
            );
            items.push(item);
        }

        const order: OrderBridge = new FirebaseOrderBridge(
            documentSnapshot.id,
            documentSnapshot.get("customer"),
            items,
            documentSnapshot.get("status"),
            (documentSnapshot.get("orderedOn") as Timestamp).toDate()
        );

        return order;
    }



    
    private productsRepository: ProductRepository = new FirebaseProductRepository();
}