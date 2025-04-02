import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    try {
        if (Array.isArray(productList)) {
            LocalStorageService.set(LOCAL_STORAGE_KEY, productList);
        }
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

export const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        togglePurchased: (state, action: PayloadAction<number>) => {
            state.products = state.products.map(product =>
                product.id === action.payload
                    ? { ...product, purchased: !product.purchased }
                    : product
            );
            syncWithLocalStorage(state.products);
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
            syncWithLocalStorage(state.products);
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            const {id, name, purchased, category, quantity} = action.payload;
            state.products = state.products.map(product => 
                product.id === id
                ? { ...product, name, quantity, category }
                : product
            );
            syncWithLocalStorage(state.products);
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            syncWithLocalStorage(state.products);
        },
        setActiveCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
    }
});

export const { setActiveCategory, togglePurchased, addProduct, editProduct, deleteProduct } = productListSlice.actions;
export const selectProductItems = (state: { productList: ProductListState }) => state.productList.products;
export const selectCategoriesItems = (state: { productList: ProductListState }) => state.productList.categories;
export const selectActiveCategory = (state: { productList: ProductListState }) => state.productList.selectedCategory;

export default productListSlice.reducer;
