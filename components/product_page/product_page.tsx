import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ProductPageUI } from "./product_page_ui";
import { NextRouter, useRouter } from "next/router";
import ProductRepository from "../../repository/product_repository";
import FirebaseProductRepository from "../../repository/firebase_product_repository";
import Product from "../../models/product";

import ErrorPage from "next/error";

export const ProductPage: FC = (props) => {
    const router: NextRouter = useRouter();
        
    const [product, setProduct] = useState<Product | undefined | null>(null);

    const productRepository = useMemo<ProductRepository>(() => new FirebaseProductRepository(), []);

    const initialize = useCallback(
        async (): Promise<void> => {
            try {
                setProduct(await productRepository.getProduct(router.query["id"] as string));
            }
            catch (exception) {
                setProduct(null);
            }
        },
        []
    );

    useEffect(
        () => {
            initialize();
        },
        []
    );

    if (product === undefined) return <></>;

    if (product === null) return <ErrorPage statusCode={404} />;

    return <ProductPageUI />;
}