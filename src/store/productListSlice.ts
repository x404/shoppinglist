import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageService } from "@services/LocalStorageService";

// helpers
import { syncWithLocalStorage } from "@helpers/syncWithLocalStorage";

// interfaces
import { Product, ProductListState } from "@/types/types";


const LOCAL_STORAGE_PRODUCT_KEY = "productList";
const storedProductList = LocalStorageService.get<Product[]>(LOCAL_STORAGE_PRODUCT_KEY);


const initialState: ProductListState = {
    products: Array.isArray(storedProductList) ? storedProductList : []
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
            const {id, name, categoryId, quantity} = action.payload;
            state.products = state.products.map(product => 
                product.id === id
                ? { ...product, name, quantity, categoryId }
                : product
            );
            syncWithLocalStorage(LOCAL_STORAGE_PRODUCT_KEY, state.products);
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            syncWithLocalStorage(LOCAL_STORAGE_PRODUCT_KEY, state.products);
        },
        clearProductsInCategory: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.categoryId !== action.payload);
            syncWithLocalStorage(LOCAL_STORAGE_PRODUCT_KEY, state.products);
        }
    }
});

export const { togglePurchased, addProduct, editProduct, deleteProduct, clearProductsInCategory } = productListSlice.actions;
export const selectProductItems = (state: { productList: ProductListState }) => state.productList.products;

export default productListSlice.reducer;
