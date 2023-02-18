import { StaticImageData } from "next/image";
import { UIProducts } from "../../../product_ui_details/ui_products";
import { blueTexturedBackgroundImage, redTexturedBackgroundImage, yellowTexturedBackgroundImage } from "../../../common_imported_images/textured_backgrounds";

export const productToTexturedBackgroundMap: Map<string, StaticImageData> = new Map(
    [
        [UIProducts.blueberry.id, blueTexturedBackgroundImage],
        [UIProducts.strawberry.id, redTexturedBackgroundImage],
        [UIProducts.pineapple.id, yellowTexturedBackgroundImage],
        [UIProducts.fig.id, yellowTexturedBackgroundImage],
    ]
);