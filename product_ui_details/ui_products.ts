import { UIProduct } from "./ui_product";

import pineappleCookieImage from "./product_images/pineapple/cookie.png";
import pineappleFruit0Image from "./product_images/pineapple/fruit.png";
import pineappleWrappedCookieImage from "./product_images/pineapple/wrapped-cookie.png";
import pineappleWrappedCookiePortraitImage from "./product_images/pineapple/wrapped-cookie-portrait.png";

import strawberryCookieImage from "./product_images/strawberry/cookie.png";
import strawberryFruit0Image from "./product_images/strawberry/fruit.png";
import strawberryWrappedCookieImage from "./product_images/strawberry/wrapped-cookie.png";
import strawberryWrappedCookiePortraitImage from "./product_images/strawberry/wrapped-cookie-portrait.png";

import figCookieImage from "./product_images/fig/cookie.png";
import figFruit0Image from "./product_images/fig/fruit.png";
import figWrappedCookieImage from "./product_images/fig/wrapped-cookie.png";
import figWrappedCookiePortraitImage from "./product_images/fig/wrapped-cookie-portrait.png";

import blueberryCookieImage from "./product_images/blueberry/cookie.png";
import blueberryFruit0Image from "./product_images/blueberry/fruit.png";
import blueberryWrappedCookieImage from "./product_images/blueberry/wrapped-cookie.png";
import blueberryWrappedCookiePortraitImage from "./product_images/blueberry/wrapped-cookie-portrait.png";

export class UIProducts {
    public static withId(id: string): UIProduct | null {
        const index: number = UIProducts.array.findIndex((value, index, array) => value.id === id);

        if (index === -1) return null;

        return UIProducts.array[index];
    }

    public static pineapple: UIProduct = {
        id: "58hh0nZMWV88WmseUWzm",
        name: "Pineapple",
        color: "#dfaa2a",
        fruits: [ pineappleFruit0Image ],
        cookieImage: pineappleCookieImage,
        wrappedCookieImage: pineappleWrappedCookieImage,
        wrappedCookiePortraitImage: pineappleWrappedCookiePortraitImage
    };
    
    public static fig: UIProduct = {
        id: "4Cw0g8NiDgAuFbzwnJjF",
        name: "Fig",
        color: "#cd7434",
        fruits: [ figFruit0Image ],
        cookieImage: figCookieImage,
        wrappedCookieImage: figWrappedCookieImage,
        wrappedCookiePortraitImage: figWrappedCookiePortraitImage
    };

    public static strawberry: UIProduct = {
        id: "FjeOWk6FqBNq8dkpLoDa",
        name: "Strawberry",
        color: "#c2203c",
        fruits: [ strawberryFruit0Image ],
        cookieImage: strawberryCookieImage,
        wrappedCookieImage: strawberryWrappedCookieImage,
        wrappedCookiePortraitImage: strawberryWrappedCookiePortraitImage
    };

    public static blueberry: UIProduct = {
        id: "FoiLz6skVaukcJZ7GBB4",
        name: "Blueberry",
        color: "#283775",
        fruits: [ blueberryFruit0Image ],
        cookieImage: blueberryCookieImage,
        wrappedCookieImage: blueberryWrappedCookieImage,
        wrappedCookiePortraitImage: blueberryWrappedCookiePortraitImage
    };

    public static array: UIProduct[] = [
        UIProducts.pineapple,
        UIProducts.fig,
        UIProducts.strawberry,
        UIProducts.blueberry
    ];
}

// export const uiProducts: UiProduct[] = [
//     {
//         name: "Pineapple",
//         color: "#dfaa2a",
//         fruits: [ pineappleFruit0Image ],
//         cookieImage: pineappleCookieImage,
//         wrappedCookieImage: pineappleWrappedCookieImage
//     },

//     {
//         name: "Fig",
//         color: "#cd7434",
//         fruits: [ figFruit0Image ],
//         cookieImage: figCookieImage,
//         wrappedCookieImage: figWrappedCookieImage
//     },
    
//     {
//         name: "Strawberry",
//         color: "#c2203c",
//         fruits: [ strawberryFruit0Image ],
//         cookieImage: strawberryCookieImage,
//         wrappedCookieImage: strawberryWrappedCookieImage
//     },
    
//     {
//         name: "Blueberry",
//         color: "#283775",
//         fruits: [ blueberryFruit0Image ],
//         cookieImage: blueberryCookieImage,
//         wrappedCookieImage: blueberryWrappedCookieImage
//     }
// ];