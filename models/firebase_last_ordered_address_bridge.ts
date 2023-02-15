import { User, getAuth } from "firebase/auth";
import { Address } from "./address";
import { StoredAddressBridge as LastOrderedAddressBridge } from "./last_ordered_address_bridge";
import { DocumentReference, DocumentSnapshot, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { NotSignedInError } from "../errors";


export class FirebaseLastOrderedAddressBridge extends LastOrderedAddressBridge {
    public async pullFromDatabase(): Promise<void> {
        const currentUser: User | null = getAuth().currentUser;
        if (currentUser === null) throw new NotSignedInError();
        
        const documentSnapshot: DocumentSnapshot = await getDoc(this.getDocumentReference());
        if (!documentSnapshot.exists()) {
            this._userId = currentUser.uid;
            this._address = undefined;
            return;
        }
        
        this._userId = documentSnapshot.id;

        const address: Address = new Address(
            documentSnapshot.get("streetAddress0"),
            documentSnapshot.get("streetAddress1"),
            documentSnapshot.get("city"),
            documentSnapshot.get("state"),
            documentSnapshot.get("pinCode")
        );
        this._address = address;
    }

    public async saveToDatabase(): Promise<void> {
        const currentUser: User | null = getAuth().currentUser;
        if (currentUser === null) throw new NotSignedInError();

        if (this.address === undefined) return;

        const data: { [key: string]: any } = {
            streetAddress0: this.address.streetAddress0,
            streetAddress1: this.address.streetAddress1,
            city: this.address.city,
            state: this.address.state,
            pinCode: this.address.pinCode
        };
        await setDoc(this.getDocumentReference(), data);
    }

    public async existsInDatabase(): Promise<boolean> {
        const currentUser: User | null = getAuth().currentUser;
        if (currentUser === null) throw new NotSignedInError();
        
        const documentSnapshot: DocumentSnapshot = await getDoc(this.getDocumentReference());
        return documentSnapshot.exists();
    }

    private getDocumentReference(): DocumentReference {
        return doc(getFirestore(), `lastOrderedAddresses/${getAuth().currentUser!.uid}`);
    };
}