import axios, { AxiosResponse } from "axios";
import { PlaceOrderResponse } from "./models/place_order_response";

export type { PlaceOrderResponse };

export class ShipRocketClient {    
    public async placeOrder(options: PlaceOrderOptions): Promise<PlaceOrderResponse> {
        const response: AxiosResponse = await axios.post("/api/shiprocket-place-order", options);

        if(response.status < 200 || response.status > 299) {
            throw new FailedToPlaceOrderException(response.data);
        }
    
        const r: PlaceOrderResponse = response.data;
    
        return r;
    }
}
    
export class InvalidCredentialsException extends Error {
    public constructor() {
        super("Invalid ShipRocket credentials");
    }
}

export class FailedToPlaceOrderException extends Error {
    public constructor(responseData: any) {
        super(`Failed to place order.\nError: ${responseData}`);
    }
}

export interface PlaceOrderOptions {
    orderId: string;
    firstName: string;
    lastName: string;
    billingDetails: BillingDetails;    
    products: PlaceOrderProduct[];
    dimensions: OrderDimensions;
    subTotal: number;
}

export interface PlaceOrderProduct {
    sku: string;
    name: string;
    units: number;
    sellingPrice: number;
}

export interface BillingDetails {
    address: Address;
    phone: string;
    email: string;
}

export interface Address {
    streetAddress: string;    
    city: string;
    pinCode: number;
    state: string;
}

export interface OrderDimensions {
    length: number;
    breadth: number;
    height: number;
    weight: number;
}