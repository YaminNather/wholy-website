export interface PlaceOrderRequest {
    order_id: string;
    order_date: string;
    pickup_location: string;
    billing_customer_name: string;
    billing_last_name: string;
    billing_address: string;
    billing_city: string;
    billing_pincode: number;
    billing_state: string;
    billing_country: string;
    billing_email: string;
    billing_phone: string;
    shipping_is_billing: boolean;
    order_items: OrderItem[];
    payment_method: "COD" | "Prepaid";
    sub_total: number;
    length: number;
    breadth: number;
    height: number;
    weight: number;

}

export interface OrderItem {
    name: string;
    sku: string;
    units: number;
    selling_price: number;
}