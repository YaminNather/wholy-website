import Product from "./product";

export default class OrderItem {
    public constructor(product: Product, price: number, quantity: number) {
        this.product = product;
        this.price = price;
        this.quantity = quantity;
    }


    
    public product: Product;
    public price: number;
    public quantity: number;
}