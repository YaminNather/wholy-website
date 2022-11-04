// import { getAuth, User } from "firebase/auth";
// import { doc, DocumentSnapshot, Firestore, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
// import FirebaseCartBridge from "../models/firebase_cart_bridge";
// import CartRepository from "./cart_repository";
// import { ModelDoesNotExistError } from "./errors";
// import { NotSignedInError } from "../errors";

// export default class FirebaseCartRepository extends CartRepository {
//     public async getCart(): Promise<CartDatabaseModel> {
//         const currentUser: User | null = getAuth().currentUser;
//         if(currentUser === null) throw new NotSignedInError();

//         const documentSnapshot: DocumentSnapshot = await getDoc(doc(this.firestore, FirebaseCartRepository.collectionName));

//         if(!documentSnapshot.exists) throw new ModelDoesNotExistError("Cart", currentUser.uid);
        
//         return this.mapDocumentSnapshotToModel(documentSnapshot);
//     }

//     public async storeCart(cart: FirebaseCartBridge): Promise<CartDatabaseModel> {
//         const currentUser: User | null = getAuth().currentUser;
//         if(currentUser === null) throw new NotSignedInError();

//         const data = this.mapModelToDatabaseForm(cart);
//         await setDoc(doc(this.firestore, FirebaseCartRepository.collectionName), data);

//         return this.getCart();
//     }

//     public mapDocumentSnapshotToModel(documentSnapshot: DocumentSnapshot): FirebaseCartBridge {
//         return new FirebaseCartBridge(
//             documentSnapshot.id,
//             documentSnapshot.get("products")
//         );
//     }

//     public mapModelToDatabaseForm(model: FirebaseCartBridge): any {
//         return {
//             products: model.products
//         };
//     }


//     private firestore: Firestore = getFirestore();

//     private static readonly collectionName = "carts";
// }