import { CSSProperties, FC, MouseEventHandler, useCallback, useState } from "react";
import Image from "next/image";
import { VisibleFace } from "../../../../flipping_card/visible_face_enum";
import { FlippingCard } from "../../../../flipping_card/flipping_card";
import classNames from "classnames";

import styles from "./flipping_product_card_styles.module.scss";
import { UIProduct } from "../../../../../product_ui_details/ui_product";
import { FrontFace } from "../../../../flipping_card/front_face";
import { BackFace } from "../../../../flipping_card/back_face";

import flippableIndicatorImage from "../../../../../public/flippable-indicator.png";

export interface FlippingProductCardProps {
    style?: CSSProperties;
    className?: string;
    uiProduct: UIProduct;
    backFaceText: string;
}

export const FlippingProductCard: FC<FlippingProductCardProps> = (props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [flippedOnce, setFlippedOnce] = useState<boolean>(false);

    const onMouseEnter = useCallback(
        ((event): void => {
            setIsHovering(true);
            if (flippedOnce === false) setFlippedOnce(true);
        }) as MouseEventHandler,
        [flippedOnce]
    );

    const onMouseLeave = useCallback(
        ((event): void => {
            setIsHovering(false);
        }) as MouseEventHandler,
        []
    );

    return (
        <div className={classNames("dark_theme", styles.card_container)}>
            <FlippingCard
                visibleFace={(!isHovering) ? VisibleFace.front : VisibleFace.back} 
                duration={800}
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave}
                style={{backgroundColor: props.uiProduct.color, ...props.style}} 
                className={classNames(styles.flipping_card, props.className)}
            >
                <FrontFace className={styles.front_face}>
                    <Image src={props.uiProduct.wrappedCookiePortraitImage} alt="" className={styles.cookie} />
                </FrontFace>

                <BackFace className={styles.back_face}>
                    <p>{props.backFaceText}</p>
                </BackFace>
                
                <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.corner_fruit, styles.top_right_fruit)} />
                
                <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.corner_fruit, styles.bottom_left_fruit)} />
            </FlippingCard>

            <Image src={flippableIndicatorImage} alt="" style={{opacity: (flippedOnce) ? 0.0 : 1.0 }} className={styles.flippable_indicator} />
        </div>
    );
};