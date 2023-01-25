import { RotatingState } from "./rotating_state_enum";
import { VisibleFace } from "./visible_face_enum";

export interface FlippingCardData {
    visibleFace: VisibleFace;
    rotatingState: RotatingState;
}