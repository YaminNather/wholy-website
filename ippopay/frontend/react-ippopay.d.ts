declare module "react-ippopay" {
    declare interface IppopayProps {
        ippopayOpen: boolean;
        ippopayClose: boolean;
        order_id: string;
        public_key: string;
    }
    
    declare const Ippopay: (props: IppopayProps)=>JSX;

    declare interface ResponseHandler {
        data: {
            status: "success" | "failure";
        }
    }
}