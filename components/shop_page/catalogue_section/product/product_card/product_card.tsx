import { CSSProperties, FC, useState } from "react";
import Image from "next/image";

import styles from "./product_card_styles.module.scss";
import classNames from "classnames";
import { UIProduct } from "../../../../../product_ui_details/ui_product";
import { FlippingCard } from "../../../../flipping_card/flipping_card";
import { VisibleFace } from "../../../../flipping_card/visible_face_enum";
import { FrontFace } from "../../../../flipping_card/front_face";
import { BackFace } from "../../../../flipping_card/back_face";
import { yellowCurvesImages } from "../../../../../common_imported_images/curves";

export interface ProductCardProps {
    style?: CSSProperties;
    className?: string;
    uiProduct: UIProduct;
    backFaceText: string;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <FlippingCard 
            visibleFace={(!isHovering) ? VisibleFace.front : VisibleFace.back} 
            duration={800}
            onMouseEnter={(event) => setIsHovering(true)} onMouseLeave={(event) => setIsHovering(false)}
            style={{backgroundColor: props.uiProduct.color, ...props.style}} className={classNames(styles.card, props.className)}>
            <FrontFace className={styles.front_face}>
                <Image src={yellowCurvesImages[1]} alt="" className={classNames(styles.curve)} />
                
                <div className={styles.cookie_container}>
                    <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.fruit, styles.top_fruit_0)} />
                    
                    <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.fruit, styles.top_fruit_1)} />
                    
                    <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.fruit, styles.bottom_fruit)} />
                                        
                    <Image src={props.uiProduct.wrappedCookieImage} alt="" className={styles.cookie} />                    
                </div>
            </FrontFace>

            <BackFace className={classNames("dark_theme", styles.back_face)}>
                <p>{props.backFaceText}</p>
            </BackFace>
        </FlippingCard>
    );
};