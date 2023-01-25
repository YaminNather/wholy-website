import { createContext } from "react";

export interface ShopPageData {
    onClickedAddToCartButton: (productId: string)=>Promise<void>;
    onClickedBuyNowButton: (productId: string)=>Promise<void>;
}

export const ShopPageContext = createContext<ShopPageData | null>(null);