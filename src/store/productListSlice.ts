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


const syncWithLocalStorage = (productList: Product[]) => {
    if (Array.isArray(productList)) {
        LocalStorageService.set(LOCAL_STORAGE_KEY, productList);
    }
};

export const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        togglePurchased: (state, action) => {
            state.products = state.products.map(product => 
                product.id === action.payload 
                    ? { ...product, purchased : !product.purchased }
                    : product
            );
            syncWithLocalStorage(state.products);
        },
        addProduct: (state, action) => {
            console.log(action.payload, state.products);
        },
        editProduct: (state, action) => {
            const products = [{"name":"Banana","quantity":"2","category":"Fruits","purchased":false,"id":"1"},{"name":"Apple","quantity":"3","category":"Vegetables","purchased":false,"id":"2"},{"name":"Milk","quantity":"4","category":"Dairy","purchased":false,"id":"3"},{"name":"Chees","quantity":"5","category":"Dairy","purchased":false,"id":"4"}];
            LocalStorageService.set(LOCAL_STORAGE_KEY, products);
            console.log('edit product', action.payload, state.products);
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            syncWithLocalStorage(state.products);
        },
        setActiveCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    }
});

export const { setActiveCategory, togglePurchased, addProduct, editProduct, deleteProduct } = productListSlice.actions;
export const selectProductItems = (state: { productList: ProductListState }) => state.productList.products;
export const selectCategoriesItems = (state: { productList: ProductListState }) => state.productList.categories;
export const selectActiveCategory = (state: { productList: ProductListState }) => state.productList.selectedCategory;

export default productListSlice.reducer;
