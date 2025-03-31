import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./store/productListSlice";

const store = configureStore({
    reducer: {
        productList: productListReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;