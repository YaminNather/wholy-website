import { FC } from "react";
import { LegalDetailsPage } from "../components/legal_details_page/legal_details_page";


const CancellationsPage: FC = (props) => {
    return (
        <LegalDetailsPage>
            <h1>Cancellation and Refunds</h1>

            <h2>Cancellation</h2> 
            
            <p>
                You may cancel your order within 12 hours of purchase, provided that the order has not yet been shipped. If you cancel your order within this timeframe, we will refund the full purchase price to the original payment method.
            </p>

            <h2>Refunds</h2> 
            
            <p>
                If you are not satisfied with your purchase, you may request a refund within 7 days of receipt of the product. To be eligible for a refund, the product must be unused and in its original packaging. Once we receive and inspect the returned product, we will issue a refund to the original payment method.
            </p>

            <h2>Shipping</h2> 
            
            <p>
                You are responsible for the cost of shipping any products back to us for return or exchange.
            </p>

            <h2>Exceptions</h2> 
            
            <p>
                We do not offer refunds or exchanges for personalized or custom products, or for products that have been damaged or misused.
            </p>

            <h2>Contact Us</h2> 
            
            <p>
                If you have any questions or concerns about our Cancellation and Refund Policy, please contact us at hello@eatwholy.com.
            </p>
        </LegalDetailsPage>
    );
};

export default CancellationsPage;