import { createSlice } from "@reduxjs/toolkit";
import CartItem from "../models/cart_item";

export interface CartSliceState {
    isLoading: boolean;
    cartItems: CartItem[];
    price: number;
}

const initialState: CartSliceState = {
    isLoading: false,
    cartItems: [],
    price: 0.0
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        
    }
});