import { Context, createContext } from "react";

export interface ProductsPageData {
    addToCart: (productId: string)=>Promise<void>;
}

export const ProductsPageDataContext = createContext<ProductsPageData | null>(null);