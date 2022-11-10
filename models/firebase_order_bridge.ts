import { doc, DocumentReference, DocumentSnapshot, getDoc, getFirestore, addDoc, setDoc, Timestamp, collection } from "firebase/firestore";
import { OrderBridge } from "./order_bridge";
import OrderItem from "./order_item";

export class FirebaseOrderBridge extends OrderBridge {
    public async pullFromDatabase(): Promise<void> {
        const documentReference: DocumentReference = doc(getFirestore(), "orders", this._id!);
        const documentSnapshot: DocumentSnapshot = await getDoc(documentReference);
        
        this._customer = documentSnapshot.get("customer");
        
        const itemsFirebase: any[] = documentSnapshot.get("items");
        this._items = [];
        for(let i: number = 0; i < itemsFirebase.length; i++) {
            const itemFirebase: any = itemsFirebase[i];
            
            const item: OrderItem = new OrderItem(
                await this.productRepository.getProduct(itemFirebase["product"]),
                itemFirebase["price"],
                itemFirebase["quantity"]
            );
            this._items.push(item);
        }

        this._status = documentSnapshot.get("status");
        
        this._orderedOn = (documentSnapshot.get("orderedOn") as Timestamp).toDate();
    }
    
    public async saveToDatabase(): Promise<void> {
        const documentReference: DocumentReference = doc(getFirestore(), "orders", this._id!);
        await setDoc(
            documentReference,
            {
                customer: this._customer!,
                items: this._items!.map(
                    (value, index, array) => {
                        return {
                            "product": value.product.id,
                            "quantity": value.quantity,
                            "price": value.price
                        };
                    }
                ),
                orderedOn: this._orderedOn!,
                status: this._status!
            }
        );
    }
}