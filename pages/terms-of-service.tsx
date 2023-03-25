import { FC } from "react";
import { LegalDetailsPage } from "../components/legal_details_page/legal_details_page";

const TermsOfServicePage: FC = (props) => {
    return (
        <LegalDetailsPage>
            <h1>Terms of Service</h1>

            <p>
                Welcome to Wholy, we offer wholesome snacking products. By accessing or using our website, you agree to comply with the following terms and conditions:
            </p>

            <h2>Description of Services</h2>
            
            <p>
                Wholy provides health and wellness products and services, including nutrition supplements and consultations.
            </p>

            <h2>User Conduct</h2>
            
            <p>
                You agree to use our website and services only for lawful purposes, and not to engage in any behavior that violates any applicable laws or regulations. You also agree not to engage in any behavior that is harmful, offensive, or fraudulent.
            </p>

            <h2>Intellectual Property</h2>
            
            <p>
                All content on our website, including text, graphics, logos, images, and software, is the property of Wholy or its licensors and is protected by Indian and international copyright laws.
            </p>

            <h2>Disclaimer of Liability</h2>
            
            <p>
                Wholy makes no representations or warranties about the accuracy, completeness, or reliability of any information or content on our website. We are not responsible for any errors or omissions in the information or content on our website, or for any loss or damage that may result from your use of our website or services.
            </p>

            <h2>Indemnification</h2>
            
            <p>
                You agree to indemnify and hold harmless Wholy and its affiliates, officers, directors, employees, and agents from any claims, damages, or expenses (including attorneys' fees) arising from your use of our website or services, or from your violation of these Terms of Service.
            </p>

            <h2>Governing Law and Dispute Resolution</h2>
            
            <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of India. Any dispute arising from your use of our website or services shall be resolved by arbitration in accordance with the Indian Arbitration and Conciliation Act of 1996.
            </p>
        </LegalDetailsPage>
    );
};

export default TermsOfServicePage;