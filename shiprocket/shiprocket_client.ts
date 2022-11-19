import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "./models/login_response";
import { PlaceOrderRequest } from "./models/place_order_request";
import { PlaceOrderResponse } from "./models/place_order_response";

export class ShipRocketClient {
    public async login(): Promise<LoginResponse> {
        const bodyJson: { [key: string]: string } = {
            "email": "mahesh@cynfas.com",
            "password": "Wholy@123"
        };
        
        const response: AxiosResponse = await axios.post("/api/shiprocket-login", bodyJson);

        if(response.status < 200 || response.status > 299) {
            throw new InvalidCredentialsException();
        }

        const r: LoginResponse = response.data;
        return r;
    }

    public async placeOrder(options: PlaceOrderOptions): Promise<PlaceOrderResponse> {
        const loginResponse: LoginResponse = await this.login();

        const headers: { [key: string]: string } = {
            "Authorization": `Bearer ${loginResponse.token}`
        };

        const date: Date = new Date((Date.now()));
        const bodyJson: PlaceOrderRequest = {
            order_id: options.orderId,
            order_date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
            pickup_location: "Primary",
            billing_customer_name: options.firstName,
            billing_last_name: options.lastName,
            billing_address: options.billingDetails.address.streetAddress,
            billing_city: options.billingDetails.address.city,
            billing_pincode: options.billingDetails.address.pinCode,
            billing_state: options.billingDetails.address.state,
            billing_country: "India",
            billing_email: options.billingDetails.email,
            billing_phone: options.billingDetails.phone,
            shipping_is_billing: true,
            order_items: options.products.map(
                (value, index, array) => {
                    return {
                        sku: value.sku,
                        name: value.name,
                        units: value.units,
                        selling_price: value.sellingPrice
                    };
                }
            ),
            payment_method: "Prepaid",
            sub_total: options.subTotal,
            length: options.dimensions.length,
            breadth: options.dimensions.breadth,
            height: options.dimensions.height,
            weight: options.dimensions.weight,
        };
        
        const response: AxiosResponse = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
            bodyJson,
            {
                headers: headers
            }
        );

        if(response.status < 200 || response.status > 299) {
            throw new Error(`Failed to place order.\nError: ${response.data}`);
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