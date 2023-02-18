import { createContext } from "react";
import Product from "../../models/product";
import { UIProduct } from "../../product_ui_details/ui_product";
import CartBridge from "../../models/cart_bridge";

export interface ProductPageController {
    readonly product: Product;
    readonly uiProduct: UIProduct;
    readonly cart: CartBridge;
}

export const ProductPageControllerContext = createContext<ProductPageController | null>(null);