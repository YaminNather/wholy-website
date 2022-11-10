import { Checkout } from "./checkout";
import { OrderBridge } from "./order_bridge";
import { DatabaseOrdersService } from "./database_orders_service";

import { addDoc, collection, doc, DocumentReference, DocumentSnapshot, getDoc, getDocs, getFirestore, query, setDoc, Timestamp, where } from "firebase/firestore";
import FirebaseProductRepository from "../repository/firebase_product_repository";
import { getAuth, User } from "firebase/auth";
import { FirebaseOrderBridge } from "./firebase_order_bridge";


export default class FirebaseDatabaseOrdersService extends DatabaseOrdersService {
public async createOrderFromCheckout(checkout: Checkout): Promise<OrderBridge> {
        const user: User | null = getAuth().currentUser;
        if(user === null) throw new Error();

        const documentReference: DocumentReference = await addDoc(
            collection(getFirestore(), "orders"), 
            {
                "customer": user.uid,
                "items": Object.values(checkout.cart.cartItems!).map(
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

        return new FirebaseOrderBridge(documentSnapshot.id, new FirebaseProductRepository());
    }   
}