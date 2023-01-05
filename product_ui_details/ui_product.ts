import { StaticImageData } from "next/image";

export interface UIProduct {
    name: string;
    cookieImage: StaticImageData;
    fruits: StaticImageData[];
    wrappedCookieImage: StaticImageData;
    color: string;
}