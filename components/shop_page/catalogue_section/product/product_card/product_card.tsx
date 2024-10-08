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

import flippableIndicatorImage from "../../../../../public/flippable-indicator.png";
import { NextRouter, useRouter } from "next/router";

export interface ProductCardProps {
    style?: CSSProperties;
    className?: string;
    uiProduct: UIProduct;
    backFaceText: string;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    const router: NextRouter = useRouter();
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <FlippingCard
            visibleFace={(!isHovering) ? VisibleFace.front : VisibleFace.back} 
            duration={300}
            onClick={(event) => router.push(`/product/${props.uiProduct.name}`)}
            onMouseEnter={(event) => setIsHovering(true)} onMouseLeave={(event) => setIsHovering(false)}
            style={{backgroundColor: props.uiProduct.color, ...props.style}} className={classNames(styles.card, props.className)}
        >
            <FrontFace className={styles.front_face}>
                <Image src={flippableIndicatorImage} alt=""  className={styles.flippable_indicator} priority={true} />

                <div className={styles.main}>
                    <Image src={yellowCurvesImages[1]} alt="" className={classNames(styles.curve)} priority={true} />
                    
                    <div className={styles.cookie_container}>
                        <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.fruit, styles.top_fruit_0)} priority={true} />
                        
                        <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.fruit, styles.top_fruit_1)} priority={true} />
                        
                        <Image src={props.uiProduct.fruits[1]} alt="" className={classNames(styles.fruit, styles.bottom_fruit)} priority={true} />
                                                                
                        <div className={styles.cookie_wrapper}>
                            <Image src={props.uiProduct.wrappedCookieImage} alt="" className={styles.cookie} priority={true} />
                        </div>
                    </div>
                </div>
            </FrontFace>

            <BackFace className={classNames("dark_theme", styles.back_face)}>
                <p>{props.backFaceText}</p>
            </BackFace>
        </FlippingCard>
    );
};