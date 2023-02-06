import classNames from "classnames";
import { CSSProperties, FC } from "react";

import styles from "./add_more_area_styles.module.scss";
import { UIProducts } from "../../../../product_ui_details/ui_products";
import { ProductCard } from "./product_card/product_card";

export interface AddMoreAreaProps {
    style?: CSSProperties;
    className?: string;
}

export const AddMoreArea: FC<AddMoreAreaProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.add_more_area, props.className)}>
            <p>If you like one, quickly add more!</p>

            <div className={styles.products_grid}>
                {UIProducts.array.map(
                    (value, array, index) => {
                        return (
                            <ProductCard key={value.id} uiProduct={value} backFaceText={backFaceText[value.id]} />
                        );
                    }
                )}
            </div>
        </div>
    );
};

const backFaceText: { [key: string]: string } = {
    [UIProducts.blueberry.id]: "Eat your blues away with Blueberry!",
    [UIProducts.pineapple.id]: "No one has time to cut and carve a pineapple! we've done it all for you! Welcoming Fine Pineapple!",
    [UIProducts.strawberry.id]: "Who doesn't like a good sweet tasting strawberry treat. Merry Strawberry!",
    [UIProducts.fig.id]: "Fig'ured out that this was the most delicious form of figs. Here comes Fig!"
};