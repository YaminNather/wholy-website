import { CSSProperties, FC, useContext, useState } from "react";
import Image from "next/image";

import styles from "./product_card_styles.module.scss";
import classNames from "classnames";
import { FlippingCard } from "../../../../flipping_card/flipping_card";
import { UIProduct } from "../../../../../product_ui_details/ui_product";
import { VisibleFace } from "../../../../flipping_card/visible_face_enum";
import { FrontFace } from "../../../../flipping_card/front_face";
import { BackFace } from "../../../../flipping_card/back_face";
import { CartController, CartControllerContext } from "../../cart_controller";

export interface ProductCardProps {
    style?: CSSProperties;
    className?: string;
    uiProduct: UIProduct;
    backFaceText: string;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    const controller: CartController = useContext(CartControllerContext)!;
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <div className={styles.product_card}>
            <div className={styles.flipping_card_container}>
                <FlippingCard 
                    visibleFace={(!isHovering) ? VisibleFace.front : VisibleFace.back} 
                    duration={800}
                    onMouseEnter={(event) => setIsHovering(true)} onMouseLeave={(event) => setIsHovering(false)}
                    style={{backgroundColor: props.uiProduct.color, ...props.style}} className={classNames(styles.flipping_card, props.className)}>
                    <FrontFace className={styles.front_face}>
                        <Image src={props.uiProduct.wrappedCookiePortraitImage} alt="" className={styles.cookie} />
                    </FrontFace>

                    <BackFace className={classNames("dark_theme", styles.back_face)}>
                        <p className={styles.back_face_text}>{props.backFaceText}</p>
                    </BackFace>
                    
                    <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.corner_fruit, styles.top_right_fruit)} />
                    
                    <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.corner_fruit, styles.bottom_left_fruit)} />
                </FlippingCard>
            </div>

            <button onClick={(event) => { controller.onIncreaseQuantityButtonClicked(props.uiProduct.id) }}>
                ADD
            </button>
        </div>
    );
};