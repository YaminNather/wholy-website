import { UIProducts } from "../product_ui_details/ui_products";
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
            this._cartItems!.set(productId, new CartItem(product, quantity));
        }
        else {
            this._cartItems!.get(productId)!.itemCount += quantity;
        }

        await this.updateDatabase();

        this.onChangeListener?.();
    }

    public get price(): number {
        let r: number = 0.0;
        for(const productId of Array.from(this._cartItems!.keys())) {
            const cartItem: CartItem = this._cartItems!.get(productId)!;
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
            this._cartItems!.get(productId)!.itemCount -= quantity;
            
            if(this._cartItems!.get(productId)!.itemCount <= 0) this._cartItems!.delete(productId);
        }

        await this.updateDatabase();
        this.onChangeListener?.();
    }

    public hasProduct(product: string): boolean {
        return this._cartItems!.has(product);
    }

    public async clear(): Promise<void> {
        await this.pullDatabaseInfo();

        if(this._cartItems!.size === 0) return;

        this._cartItems!.clear();        
        await this.updateDatabase();
        
        this.onChangeListener?.();
    }

    public async mergeCart(mergingCart: CartBridge): Promise<void> {
        await this.pullDatabaseInfo();

        const productIds: string[] = Array.from(mergingCart._cartItems!.keys());
        for (const productId of productIds) {
            await this.addProduct(productId, mergingCart._cartItems!.get(productId)!.itemCount);
        }

        await this.updateDatabase();
        this.onChangeListener?.();
    }

    public setOnChangeListener(listener: ()=>void): void {
        this.onChangeListener = listener;
    }

    public removeOnChangeListener(): void {
        this.onChangeListener = undefined;
    }

    public get cartItems(): CartItem[] {
        if (this._cartItems!.size === 0) return [];

        const r: CartItem[] =  Array.from<CartItem>(this._cartItems!.values());
        
        const cartItemsOrder: Map<string, number> = CartBridge.cartItemsOrder;
        r.sort((element0, element1) => cartItemsOrder.get(element0.product.id)! - cartItemsOrder.get(element1.product.id)!);
        
        return r;
    }

    public abstract pullDatabaseInfo(): Promise<void>;

    public abstract updateDatabase(): Promise<void>;


    public id?: string;
    protected _cartItems?: Map<string, CartItem>;
    protected onChangeListener?: ()=>void;
    
    protected productRepository: ProductRepository;


    private static cartItemsOrder: Map<string, number> = new Map<string, number>(
        [
            [UIProducts.pineapple.id, 0],
            [UIProducts.strawberry.id, 1],
            [UIProducts.fig.id, 2],
            [UIProducts.blueberry.id, 3]
        ]
    );
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