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
        </LegalDetailsPage>
    );
};

export default PrivacyPolicy;