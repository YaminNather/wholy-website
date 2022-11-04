import Product from "./product";

export default class CartItem {
    public constructor(product: Product, itemCount: number) {
        this.product = product;
        this.itemCount = itemCount;
    }

    product: Product;
    itemCount: number;
}