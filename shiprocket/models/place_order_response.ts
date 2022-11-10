export interface PlaceOrderResponse {
    order_id: string;
    shipment_id: string;
    status: "NEW";
    status_code: number;
    onboarding_completed_now: number;
    awb_code?: string;
    courier_company_id?: string;
    courier_name?: string;    
}