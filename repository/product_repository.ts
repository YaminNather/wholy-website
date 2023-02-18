import Product from "../models/product";

export default abstract class ProductRepository {
    public abstract getAllProducts(): Promise<Product[]>;
    
    public abstract getProduct(productId: string): Promise<Product>;

    public abstract getProductByName(name: string): Promise<Product>;
}

export class ProductDoesNotExistError extends Error {
    public constructor(id: string) {
        super(`Product with id ${id} does not exist`);
    }    
}

export class ProductWithNameDoesNotExistError extends Error {
    public constructor(name: string) {
        super(`Product with name ${name} does not exist`);
    }
}