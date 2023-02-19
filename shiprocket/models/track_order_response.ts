export interface TrackOrderResponse {
    tracking_data: TrackingData;
}

export interface TrackingData {
    track_status: number;
    shipment_status: number;
    shipment_track: ShipmentTrack[];
    shipment_track_activities: ShipmentTrackActivity[];
    track_url: string;
    etd: string;
}

export interface ShipmentTrackActivity {
    date: string;
    status: string;
    activity: string;
    location: string;
    "sr-status": string;
}

export interface ShipmentTrack {
    id: number;
    awb_code: string;
    courier_company_id: number;
    shipment_id: number;
    order_id: number;
    pickup_date?: any;
    delivered_date?: any;
    weight: string;
    packages: number;
    current_status: string;
    delivered_to: string;
    destination: string;
    consignee_name: string;
    origin: string;
    courier_agent_details?: any;
    edd: string;
}