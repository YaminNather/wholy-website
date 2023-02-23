import { createContext } from "react";
import Product from "../../models/product";
import { UIProduct } from "../../product_ui_details/ui_product";
import CartBridge from "../../models/cart_bridge";

export interface ProductPageController {
    readonly product: Product;
    readonly uiProduct: UIProduct;
    readonly cart: CartBridge;
    readonly quantity: number;
    readonly onIncreaseButtonClicked: ()=>Promise<void>;
    readonly onDecreaseButtonClicked: ()=>Promise<void>;
    readonly getYoursButtonClicked: ()=>Promise<void>;
    readonly underCookieGetYoursButtonClicked: ()=>Promise<void>;
    readonly onAddToCartButtonClicked: (product: string)=>Promise<void>;
}

export const ProductPageControllerContext = createContext<ProductPageController | null>(null);