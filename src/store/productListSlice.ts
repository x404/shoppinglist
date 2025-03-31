import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/types";


interface ProductListState {
    productList: Product[];
}

const LOCAL_STORAGE_KEY = "productList";
const savedShoppingList = [] as Product[];

// const initialState: CartState = {
//     shoppingList: Array.isArray(savedShoppingList) ? savedShoppingList : [],
// };

const initialState: ProductListState = {
    productList: [
        { "name": 'Banana', "quantity": "2", "category": "Fruits", "purchased": false, "id": "1" },
        { "name": 'Apple', "quantity": "3", "category": "Vegetables", "purchased": false, "id": "2" },
        { "name": 'Milk', "quantity": "3", "category": "Dairy", "purchased": false, "id": "3" },
        { "name": 'Chees', "quantity": "3", "category": "Dairy", "purchased": false, "id": "4" },
    ],
};


export const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        togglePurchased: (state, action) => {
            console.log(action.payload, state.productList);
            // console.log(action.payload)
        },
        addProduct: (state, action) => {
            console.log(action.payload, state.productList);
        },
        editProduct: (state, action) => {
            console.log(action.payload, state.productList);
        },
        removeProduct: (state, action) => {
            // state.productList = [];
            console.log(action.payload, state.productList);
        }
    }
});

export const { togglePurchased, addProduct, editProduct, removeProduct } = productListSlice.actions;
export const selectProductItems = (state: {productList : {productList : Product[]}}) => state.productList;

export default productListSlice.reducer;
