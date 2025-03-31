import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/types";


interface CartState {
    shoppingList: Product[];
}

const LOCAL_STORAGE_KEY = "products";
const savedShoppingList = [] as Product[];

const initialState: CartState = {
    shoppingList: Array.isArray(savedShoppingList) ? savedShoppingList : [],
};


export const productSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        quantityChange: (state, action) => {
            state.shoppingList = [];
            console.log(action.payload)
        },
        productRemove: (state, action) => {
            state.shoppingList = [];
            console.log(action.payload)
        },
        clearCart: (state) => {
            state.shoppingList = []
        }
    }
});

export default productSlice.reducer;
