import { Context, createContext } from "react";
import { FlippingCardData } from "./flipping_card_data";
import { VisibleFace } from "./visible_face_enum";
import { RotatingState } from "./rotating_state_enum";

export const FlippingCardContext: Context<FlippingCardData> = createContext<FlippingCardData>({ visibleFace: VisibleFace.front, rotatingState: RotatingState.idle });