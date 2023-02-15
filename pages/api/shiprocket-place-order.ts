import { NextApiRequest, NextApiResponse } from "next";
import { FailedToPlaceOrderException, PlaceOrderOptions, PlaceOrderResponse, ShipRocketClient } from "../../shiprocket/shiprocket_client";
import { LoginResponse } from "../../shiprocket/models/login_response";
import { PlaceOrderRequest } from "../../shiprocket/models/place_order_request";
import axios, { AxiosResponse } from "axios";
import { Env } from "../../env";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const loginResponse: LoginResponse = await login();

    const headers: { [key: string]: string } = {
        "Authorization": `Bearer ${loginResponse.token}`
    };

    const options: PlaceOrderOptions = request.body;
    const date: Date = new Date((Date.now()));
    const bodyJson: PlaceOrderRequest = {
        order_id: options.orderId,
        order_date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
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
    
    let shiprocketResponse: AxiosResponse;
    try {
        shiprocketResponse = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
            bodyJson,
            {
                headers: headers
            }
        );
    }
    catch(e) {
        throw "Failed to throw";
    }

    response.statusCode = shiprocketResponse.status;
    response.send(shiprocketResponse.data);
}

async function login(): Promise<LoginResponse> {
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