import ProductRepository from "../repository/product_repository";
import CartItem from "./cart_item";
import Product from "./product";

export default abstract class CartBridge {
    public constructor(productRepository: ProductRepository, id?: string) {
        this.id = id;
        this.productRepository = productRepository;
    }

    public abstract createNewCart(): Promise<void>;

    public async addProduct(productId: string, quantity: number): Promise<void> {
        await this.pullDatabaseInfo();

        const product: Product = await this.productRepository.getProduct(productId);
        
        if(!this.hasProduct(productId)) {
            this.cartItems!.set(productId, new CartItem(product, quantity));
        }
        else {
            this.cartItems!.get(productId)!.itemCount += quantity;
        }

        await this.updateDatabase();

        this.onChangeListener?.();
    }

    public get price(): number {
        let r: number = 0.0;
        for(const productId of Object.keys(this.cartItems!)) {
            const cartItem: CartItem = this.cartItems!.get(productId)!;
            r += cartItem.product.price * cartItem.itemCount;
        }

        return r;
    }
    
    public async removeProduct(productId: string, quantity: number): Promise<void> {
        await this.pullDatabaseInfo();

        const product: Product = await this.productRepository.getProduct(productId);
        
        if(!this.hasProduct(productId)) {
            throw new CartItemDoesNotExistError(productId);
        }
        else {
            this.cartItems!.get(productId)!.itemCount -= quantity;
            
            if(this.cartItems!.get(productId)!.itemCount <= 0) this.cartItems!.delete(productId);
        }

        await this.updateDatabase();
        this.onChangeListener?.();
    }

    public hasProduct(product: string): boolean {
        return Object.keys(this.cartItems!).findIndex((value, index) => value === product) !== -1;
    }

    public async clear(): Promise<void> {
        if(Object.keys(this.cartItems!).length === 0) return;

        this.cartItems?.clear();
        
        await this.updateDatabase();
        
        this.onChangeListener?.();
    }

    public async mergeCart(mergingCart: CartBridge): Promise<void> {
    }

    public setOnChangeListener(listener: ()=>void): void {
        this.onChangeListener = listener;
    }

    public removeOnChangeListener(): void {
        this.onChangeListener = undefined;
    }

    public abstract pullDatabaseInfo(): Promise<void>;

    public abstract updateDatabase(): Promise<void>;


    public id?: string;
    public cartItems?: Map<string, CartItem> = new Map<string, CartItem>();
    protected onChangeListener?: ()=>void;
    
    protected productRepository: ProductRepository;

}

export class IdNotSetError extends Error {
    public constructor() {
        super(`Id not set for cart bridge`);
    }
}

export class CartItemDoesNotExistError extends Error {
    public constructor(productId: string) {
        super(`Product ${productId} does not exist in cart`);
    }
}