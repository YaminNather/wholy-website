import { CSSProperties, FC, useContext, useState } from "react";
import { Accordion } from "../../../accordion/accordion";
import classNames from "classnames";
import { Header } from "../../../accordion/header";
import { Content } from "../../../accordion/content";
import { CartController, CartControllerContext } from "../cart_controller";

import pageStyles from "../cart_ui_styles.module.scss";

export interface ShippingAddressAreaProps {
    style?: CSSProperties;
    className?: string;
}

export const ShippingAddressArea: FC<ShippingAddressAreaProps> = (props) => {
    const controller: CartController = useContext(CartControllerContext)!;

    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <Accordion className={classNames(props.className)} isExpanded={isOpened}>
            <Header onToggled={(isExpanded) => setIsOpened(isExpanded)}>
                <h6>Shipping Address</h6>
            </Header>

            <Content>
                <div className={pageStyles.input_field_container}>
                    <label>Full Name *</label>
                    
                    <input 
                        value={controller.fullName}
                        onChange={(event) => controller.onFullNameChanged(event.target.value)} 
                    />
                </div>
                
                <div className={pageStyles.input_field_container}>
                    <label>Street Address *</label>
                    
                    <input 
                        value={controller.address.streetAddress0} 
                        onChange={(event) => controller.onAddressChanged?.({...controller.address, streetAddress0: event.target.value})} 
                    />

                    <input 
                        value={controller.address.streetAddress1} 
                        onChange={(event) => controller.onAddressChanged?.({...controller.address, streetAddress1: event.target.value})} 
                    />
                </div>                            
                
                <div className={pageStyles.input_field_container}>
                    <label>City *</label>
                    
                    <input 
                        value={controller.address.city} 
                        onChange={(event) => controller.onAddressChanged?.({...controller.address, city: event.target.value})} 
                    />
                </div>
                
                <div className={pageStyles.input_field_container}>
                    <label>State/Province</label>
                    
                    <input 
                        value={controller.address.state} 
                        onChange={(event) => controller.onAddressChanged?.({...controller.address, state: event.target.value})} 
                    />
                </div>
                
                <div className={pageStyles.input_field_container}>
                    <label>Zip/Postal Code *</label>
                    
                    <input 
                        value={controller.address.postalCode} 
                        onChange={(event) => controller.onAddressChanged?.({...controller.address, postalCode: event.target.value})} 
                    />
                </div>
            </Content>
        </Accordion>
    );
};