export interface CreateOrderRequest {
    amount:        number;
    currency?:      string;
    payment_modes?: string;
    customer?:      Customer;
}

export interface Customer {
    name:  string;
    email: string;
    phone: Phone;
}

export interface Phone {
    country_code:    string;
    national_number: string;
}
