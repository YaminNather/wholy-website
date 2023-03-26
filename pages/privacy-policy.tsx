import { FC } from "react";
import { LegalDetailsPage } from "../components/legal_details_page/legal_details_page";


const PrivacyPolicy: FC = (props) => {
    return (
        <LegalDetailsPage>
            <h1>Privacy Policy</h1>

            <p>
                At Wholy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website or services:
            </p>

            <h2>Information We Collect</h2> 

            <p>
                We collect information that you provide to us, such as your name, email address, and payment information. We also collect information about your use of our website and services, such as your IP address, browser type, and device information.
            </p>

            <h2>Use of Information</h2>

            <p>
                We use the information we collect to provide and improve our website and services, to communicate with you about our products and services, and to personalize your experience on our website.
            </p>

            <h2>Sharing of Information</h2> 
            
            <p>
                We may share your information with third-party service providers that assist us in providing our website and services, such as payment processors and shipping providers. We may also share your information with law enforcement agencies or other third parties if we believe that disclosure is necessary to comply with a legal obligation or to protect our rights or the rights of others.
            </p>

            <h2>Data Retention</h2>
            
            <p>
                We will retain your information for as long as necessary to provide our website and services to you, or as required by applicable laws or regulations.
            </p>

            <h2>Your Rights</h2>
            
            <p>
                You have the right to access, modify, or delete your personal information. You can also object to the processing of your personal information, or request that we restrict the processing of your personal information.
            </p>

            <h2>Contact Us</h2> 
            
            <p>
                If you have any questions or concerns about our Privacy Policy, please contact us at hello@eatwholy.com.
            </p>

        </LegalDetailsPage>
    );
};

export default PrivacyPolicy;