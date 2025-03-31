import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/types";
import { LocalStorageService } from "../services/LocalStorageService";


// interface ProductListState {
//     productList: Product[];
// }

const LOCAL_STORAGE_KEY = "productList";
const savedProductList = LocalStorageService.get<Product[]>(LOCAL_STORAGE_KEY);

const initialState = {
    productList: Array.isArray(savedProductList) ? savedProductList : [],
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
