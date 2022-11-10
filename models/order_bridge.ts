import ProductRepository from "../repository/product_repository";
import OrderItem from "./order_item";

export abstract class OrderBridge {
    public constructor(id: string, productRepository: ProductRepository) {
        this._id = id;
        this.productRepository = productRepository;
    }

    public abstract pullFromDatabase(): Promise<void>;

    public abstract saveToDatabase(): Promise<void>;

    public get id(): string {
        return this._id;
    }

    public get customer(): string {
        return this._customer!;
    }

    public get items(): OrderItem[] {
        return this._items!;
    }

    public set items(newValue: OrderItem[]) {
        this._items = newValue;
    }
    
    public get status(): OrderStatus {
        return this._status!;
    }

    public set status(newValue: OrderStatus) {
        this._status = newValue;
    }
    
    public get orderedOn(): Date {
        return this._orderedOn!;
    }

    protected _id: string;

    protected productRepository: ProductRepository;

    protected _customer?: string;
    protected _items?: OrderItem[];
    protected _status?: OrderStatus;
    protected _orderedOn?: Date;
}

export enum OrderStatus {
    paymentPending = "paymentPending",
    paymentDone = "paymentDone"
}