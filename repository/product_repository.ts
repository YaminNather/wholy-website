import Product from "../models/product";

export default abstract class ProductRepository {
    public abstract getAllProducts(): Promise<Product[]>;
    public abstract getProduct(productId: string): Promise<Product>;
}

export class ProductDoesNotExistError extends Error {
    public constructor(id: string) {
        super(`Product with id ${id} does not exist`);
    }
}