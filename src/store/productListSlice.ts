import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageService } from "../services/LocalStorageService";

// helpers
import { syncWithLocalStorage } from "../helpers/syncWithLocalStorage";

// constants
import { DEFAULT_CATEGORIES } from "../constants/categories";

// interfaces
import { Product, ProductListState } from "../types/types";


const LOCAL_STORAGE_PRODUCT_KEY = "productList";
const savedProductList = LocalStorageService.get<Product[]>(LOCAL_STORAGE_PRODUCT_KEY);


const initialState: ProductListState = {
    products: Array.isArray(savedProductList) ? savedProductList : [],
    categories: LocalStorageService.get<string[]>('categories') || DEFAULT_CATEGORIES,
    selectedCategory: 'All'
};


export const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        togglePurchased: (state, action: PayloadAction<string>) => {
            state.products = state.products.map(product =>
                product.id === action.payload
                    ? { ...product, purchased: !product.purchased }
                    : product
            );
            syncWithLocalStorage(LOCAL_STORAGE_PRODUCT_KEY, state.products);
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
            syncWithLocalStorage(LOCAL_STORAGE_PRODUCT_KEY, state.products);
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            const {id, name, category, quantity} = action.payload;
            state.products = state.products.map(product => 
                product.id === id
                ? { ...product, name, quantity, category }
                : product
            );
            syncWithLocalStorage(LOCAL_STORAGE_PRODUCT_KEY, state.products);
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            syncWithLocalStorage(LOCAL_STORAGE_PRODUCT_KEY, state.products);
        },
        setActiveCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        }
    }
});

export const { setActiveCategory, togglePurchased, addProduct, editProduct, deleteProduct } = productListSlice.actions;
export const selectProductItems = (state: { productList: ProductListState }) => state.productList.products;
export const selectCategoriesItems = (state: { productList: ProductListState }) => state.productList.categories;
export const selectActiveCategory = (state: { productList: ProductListState }) => state.productList.selectedCategory;

export default productListSlice.reducer;
