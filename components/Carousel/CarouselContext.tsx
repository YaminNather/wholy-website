import { Context, createContext } from "react";
import { CarouselData } from "./CarouselData";

export const carouselContext: Context<CarouselData> = createContext<CarouselData>({currentSlide: 0, isMouseHovering: false});