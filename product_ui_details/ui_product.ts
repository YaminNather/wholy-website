import { StaticImageData } from "next/image";

export interface UIProduct {
    id: string;
    name: string;
    cookieImage: StaticImageData;
    fruits: StaticImageData[];
    wrappedCookieImage: StaticImageData;
    wrappedCookieWithShadowImage: StaticImageData;
    wrappedCookieBackImage: StaticImageData;
    wrappedCookieBackWithShadowImage: StaticImageData;
    wrappedCookiePortraitImage: StaticImageData;
    unwrappedCookieWithHaloImage: StaticImageData;
    color: string;
    nameContainerImage: StaticImageData;
    concentricCirclesImage: StaticImageData;
}