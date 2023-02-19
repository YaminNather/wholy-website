import { TrackingData } from "../../shiprocket/models/track_order_response";

export interface OrderListItemDetails {
    readonly id: string;
    readonly customer: string;
    readonly items: OrderItemListItemDetails[];
    readonly trackingData: TrackingData | undefined;
}

export interface OrderItemListItemDetails {
    readonly product: ProductDetails;
    readonly quantity: number;
}

export interface ProductDetails {
    readonly id: string;
    readonly name: string;
}