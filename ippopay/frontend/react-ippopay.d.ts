declare module "react-ippopay" {
    export interface IppopayProps {
        ippopayOpen: boolean;
        ippopayClose: boolean;
        order_id: string;
        public_key: string;
    }
    
    export const Ippopay : FC<IppopayProps>;

    export interface ResponseHandler {
        data: {
            status: "success" | "failure";
        }
    }
}