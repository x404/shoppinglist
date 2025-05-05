import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageService } from "@services/LocalStorageService";

// helpers
import { syncWithLocalStorage } from "@helpers/syncWithLocalStorage";

// interfaces
import { Product, ProductListState } from "@/types/types";


const LOCAL_STORAGE_PRODUCT_KEY = "productList";
const storedProductList = LocalStorageService.get<Product[]>(LOCAL_STORAGE_PRODUCT_KEY);


const initialState: ProductListState & { filterQuery: string } = {
    products: Array.isArray(storedProductList) ? storedProductList : [],
    filterQuery: ''
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
            const { id, name, categoryId, quantity } = action.payload;
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
        },
        setFilterQuery: (state, action: PayloadAction<string>) => {
            state.filterQuery = action.payload;
        }
    }
});

export const {
    togglePurchased,
    addProduct,
    editProduct,
    deleteProduct,
    clearProductsInCategory,
    setFilterQuery
} = productListSlice.actions;

export const selectProductItems = (state: { productList: ProductListState })  => {
    return state.productList.products;
}

export const selectFilteredProducts = (state: { productList: ProductListState & { filterQuery: string } }) => {
    const query = state.productList.filterQuery.toLowerCase();
    return state.productList.products.filter(product =>
        product.name.toLowerCase().includes(query)
    );
};


export default productListSlice.reducer;
