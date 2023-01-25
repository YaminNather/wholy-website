import { StaticImageData } from "next/image";

export interface UIProduct {
    id: string;
    name: string;
    cookieImage: StaticImageData;
    fruits: StaticImageData[];
    wrappedCookieImage: StaticImageData;
    color: string;
}