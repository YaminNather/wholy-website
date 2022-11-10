import ProductRepository from "../repository/product_repository";
import CartItem from "./cart_item";
import Product from "./product";

export default abstract class CartBridge {
    public constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public async addProduct(productId: string, quantity: number): Promise<void> {
        const product: Product = await this.productRepository.getProduct(productId);
        
        if(!this.hasProduct(productId)) {
            this.cartItems![productId] = new CartItem(product, quantity);
        }
        else {
            this.cartItems![productId]!.itemCount += quantity;
        }

        await this.updateDatabase();

        this.onChangeListener?.();
    }

    public get price(): number {
        let r: number = 0.0;
        for(const productId of Object.keys(this.cartItems!)) {
            const cartItem: CartItem = this.cartItems![productId];
            r += cartItem.product.price * cartItem.itemCount;
        }

        return r;
    }
    
    public async removeProduct(productId: string, quantity: number): Promise<void> {
        const product: Product = await this.productRepository.getProduct(productId);
        
        if(!this.hasProduct(productId)) {
            throw new CartItemDoesNotExistError(productId);
        }
        else {
            this.cartItems![productId]!.itemCount -= quantity;
            
            if(this.cartItems![productId]!.itemCount <= 0) delete this.cartItems![productId];            
        }

        await this.updateDatabase();
        this.onChangeListener?.();
    }

    public hasProduct(product: string): boolean {
        return Object.keys(this.cartItems!).findIndex((value, index) => value === product) !== -1;
    }

    public async clear(): Promise<void> {
        if(Object.keys(this.cartItems!).length === 0) return;

        this.cartItems = {};
        
        await this.updateDatabase();
        
        this.onChangeListener?.();
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
    public cartItems?: { [key: string]: CartItem };
    protected onChangeListener?: ()=>void;
    
    protected productRepository: ProductRepository;

}

export class CartItemDoesNotExistError extends Error {
    public constructor(productId: string) {
        super(`Product ${productId} already present in cart`);
    }
}