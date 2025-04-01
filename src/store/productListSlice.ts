import { createSlice } from "@reduxjs/toolkit";
import { Product, ProductListState } from "../types/types";
import { LocalStorageService } from "../services/LocalStorageService";


const LOCAL_STORAGE_KEY = "productList";
const savedProductList = LocalStorageService.get<Product[]>(LOCAL_STORAGE_KEY);

const getNamesCategories = (productList: Product[]): string[] => {
    const categories = new Set(productList.map(product => product.category));
    return Array.from(categories);
}

const initialState: ProductListState = {
    products: Array.isArray(savedProductList) ? savedProductList : [],
    categories: getNamesCategories(Array.isArray(savedProductList) ? savedProductList : []),
    selectedCategory: 'All'
};

export const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        togglePurchased: (state, action) => {
            console.log(action.payload, state.products);
            // console.log(action.payload)
        },
        addProduct: (state, action) => {
            console.log(action.payload, state.products);
        },
        editProduct: (state, action) => {
            console.log(action.payload, state.products);
        },
        removeProduct: (state, action) => {
            // state.productList = [];
            console.log(action.payload, state.products);
        },
        setActiveCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    }
});

export const { setActiveCategory, togglePurchased, addProduct, editProduct, removeProduct } = productListSlice.actions;
export const selectProductItems = (state: { productList: ProductListState }) => state.productList.products;
export const selectCategoriesItems = (state: { productList: ProductListState }) => state.productList.categories;
export const selectActiveCategory = (state: { productList: ProductListState }) => state.productList.selectedCategory;

export default productListSlice.reducer;
