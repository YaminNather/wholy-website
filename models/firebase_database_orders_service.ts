import { Checkout } from "./checkout";
import { OrderBridge } from "./order_bridge";
import { DatabaseOrdersService } from "./database_orders_service";

import { addDoc, collection, DocumentReference, DocumentSnapshot, getDoc, getDocs, getFirestore, Query, query, QuerySnapshot, Timestamp, where } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { FirebaseOrderBridge } from "./firebase_order_bridge";
import OrderItem from "./order_item";
import ProductRepository from "../repository/product_repository";
import FirebaseProductRepository from "../repository/firebase_product_repository";


export default class FirebaseDatabaseOrdersService extends DatabaseOrdersService {
    public async createOrderFromCheckout(checkout: Checkout): Promise<OrderBridge> {
        const user: User | null = getAuth().currentUser;
        if(user === null) throw new Error();

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

        for(let i: number = 0; i < querySnapshot.docs.length; i++) {
            const documentSnapshot: DocumentSnapshot = querySnapshot.docs[i];
        
            const itemsFirebase: any[] = documentSnapshot.get("items");
            const items = [];
            for(let i: number = 0; i < itemsFirebase.length; i++) {
                const itemFirebase: any = itemsFirebase[i];
                
                const item: OrderItem = new OrderItem(
                    await this.productsRepository.getProduct(itemFirebase["product"]),
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

            r.push(order);
        }

        return r;
    }

    private productsRepository: ProductRepository = new FirebaseProductRepository();
}