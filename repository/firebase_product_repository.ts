import Product from "../models/product";
import ProductRepository, { ProductWithNameDoesNotExistError } from "./product_repository";
import { collection, Firestore, getFirestore, getDocs, QuerySnapshot, getDoc, DocumentSnapshot, doc, query, where, Query }  from "firebase/firestore";
import type { CollectionReference } from "firebase/firestore";
import { ModelDoesNotExistError } from "./errors";

export default class FirebaseProductRepository implements ProductRepository {
    public async getAllProducts(): Promise<Product[]> {
        const querySnapshot: QuerySnapshot = await getDocs(this.productCollection);
                
        if(querySnapshot.empty) return [];

        const r: Product[] = [];
        for(const documentSnapshot of querySnapshot.docs) {
            const product: Product = this.mapDocumentSnapshotToModel(documentSnapshot);
            r.push(product);
        }

        return r;
    }

    public async getProduct(productId: string): Promise<Product> {        
        const documentSnapshot: DocumentSnapshot = await getDoc(doc(this.firestore, FirebaseProductRepository.collectionName, productId));

        if(!documentSnapshot.exists()) throw new ModelDoesNotExistError("Product", productId);
        
        return this.mapDocumentSnapshotToModel(documentSnapshot);
    }

    public async getProductByName(name: string): Promise<Product> {
        const transformedName: string = name[0].toUpperCase() + name.slice(1, name.length);
        const getQuery: Query = query(this.productCollection, where("name", "==", transformedName));

        const querySnapshot: QuerySnapshot = await getDocs(getQuery);
        
        if (querySnapshot.size < 1) throw new ProductWithNameDoesNotExistError(name);

        return this.mapDocumentSnapshotToModel(querySnapshot.docs[0]);
    }

    private mapDocumentSnapshotToModel(documentSnapshot: DocumentSnapshot): Product {
        const r: Product = {
            id: documentSnapshot.id,
            name: documentSnapshot.get("name"),
            price: documentSnapshot.get("price"),
            inStock: documentSnapshot.get("inStock"),
            color: documentSnapshot.get("color"),
            nameColor: documentSnapshot.get("nameColor"),
            cookieImage: documentSnapshot.get("cookieImage"),
            fruitImage: documentSnapshot.get("fruitImage"),
            wrappedCookieImage: documentSnapshot.get("wrappedCookieImage"),
            concentricCircleImage: documentSnapshot.get("concentricCircleImage")
        };
        
        return r;
    }

    private mapModelToDatabaseForm(model: Product): any {
        return {
            name: model.name,
            price: model.price,
            inStock: model.inStock,
            color: model.color,
            cookieImage: model.cookieImage,
            fruitImage: model.fruitImage,
        };
    }

    private get productCollection(): CollectionReference {
        return collection(this.firestore, FirebaseProductRepository.collectionName);
    }



    private firestore: Firestore = getFirestore();

    private static collectionName: string = "products";
}
