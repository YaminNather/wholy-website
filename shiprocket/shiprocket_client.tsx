import axios, { AxiosResponse } from "axios";
import { PlaceOrderResponse } from "./models/place_order_response";
import { TrackOrderResponse, TrackingData } from "./models/track_order_response";
import { LoginResponse } from "./models/login_response";
import { Env } from "../env";

export type { PlaceOrderResponse };

export class ShipRocketClient {
    private async login(): Promise<LoginResponse> {
        let body: any = {
            "email": Env.shiprocketEmail,
            "password": Env.shiprocketPassword
        };
    
        let axiosResponse: AxiosResponse = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/auth/login",
            body
        );
        
        return axiosResponse.data;
    }

    public async placeOrder(options: PlaceOrderOptions): Promise<PlaceOrderResponse> {
        const response: AxiosResponse = await axios.post("/api/shiprocket-place-order", options);

        if(response.status < 200 || response.status > 299) {
            throw new FailedToPlaceOrderException(response.data);
        }
    
        const r: PlaceOrderResponse = response.data;
    
        return r;
    }    

    public async trackOrder(orderId: string, channelId?: string): Promise<TrackingData | undefined> {
        const query: any = {
            "order_id": orderId
        };
        const response: AxiosResponse = await axios.get("/api/shiprocket-track-order", { params: query });
        
        const data: TrackOrderResponse[] = response.data;
        if (response.status === 404 || data.length === 0) return undefined;

        return response.data[0];
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

export class OrderDoesNotExistException extends Error {
    public constructor(id: string) {
        super(`Order with id ${id} does not exist`);
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