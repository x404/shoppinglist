import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./store/productReducer";

const store = configureStore({
    reducer: {
        cart: productReducer
    }
});


export default store;