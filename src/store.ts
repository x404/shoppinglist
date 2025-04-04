import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./store/productListSlice";

const store = configureStore({
    reducer: {
        productList: productListReducer
    }
});

export default store;