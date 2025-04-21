import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "@store/productListSlice";
import categoriesReducer from "@store/categoriesSlice";

const store = configureStore({
    reducer: {
        productList: productListReducer,
        categories: categoriesReducer
    }
});

export default store;