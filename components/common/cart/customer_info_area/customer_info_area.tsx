import { CSSProperties, FC, useContext, useState } from "react";

import pageStyles from "../cart_ui_styles.module.scss";
import { Accordion } from "../../../accordion/accordion";
import { Header } from "../../../accordion/header";
import { Content } from "../../../accordion/content";
import { CartController, CartControllerContext } from "../cart_controller";

export interface CustomerInfoAreaProps {
    readonly style?: CSSProperties;
    readonly className?: string;
}

export const CustomerInfoArea: FC<CustomerInfoAreaProps> = (props) => {
    const controller: CartController = useContext(CartControllerContext)!;

    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <Accordion style={props.style} className={props.className} isExpanded={isOpened}>
            <Header onToggled={(isExpanded) => setIsOpened(isExpanded)}>
                <h6>Customer Info</h6>
            </Header>

            <Content>
                <div className={pageStyles.input_field_container}>
                    <label>Email *</label>
                    
                    <input value={controller.email} onChange={(event) => controller.onEmailChanged(event.target.value)} />
                </div>
                
                <div className={pageStyles.input_field_container}>
                    <label>Phone Number *</label>
                    
                    <input value={controller.phone} onChange={(event) => controller.onPhoneChanged(event.target.value)} />
                </div>
            </Content>
        </Accordion>
    );
};