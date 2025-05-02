import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageService } from "@services/LocalStorageService";

// interfaces
import { CategoryListState, Category } from "@/types/types";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";
import { syncWithLocalStorage } from "../helpers/syncWithLocalStorage";


const LOCAL_STORAGE_CATEGORY_KEY = "categories";
const storedCategories = LocalStorageService.get<Category[]>(LOCAL_STORAGE_CATEGORY_KEY);

const initialState: CategoryListState = {
    categories: Array.isArray(storedCategories) ? storedCategories : [],
    selectedCategoryId: ALL_CATEGORY_OBJECT.id
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories.push(action.payload);
            syncWithLocalStorage(LOCAL_STORAGE_CATEGORY_KEY, state.categories);
        },
        editCategory: (state, action) => {
            const { id, name } = action.payload;
            state.categories = state.categories.map(category =>
                category.id === id
                    ? { ...category, name }
                    : category
            );
            syncWithLocalStorage(LOCAL_STORAGE_CATEGORY_KEY, state.categories);
        },
        deleteCategoryById: (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
            syncWithLocalStorage(LOCAL_STORAGE_CATEGORY_KEY, state.categories);
        },
        moveCategory: (state, action) => {
            console.log(action.payload, state);
        },
        setActiveCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategoryId = action.payload;
        }
    }
})


export const { setActiveCategory, addCategory, editCategory, deleteCategoryById } = categoriesSlice.actions;
export const selectActiveCategoryId = (state: { categories: CategoryListState }) => state.categories.selectedCategoryId;
export const selectCategoriesItems = (state: { categories: CategoryListState }) => state.categories.categories;

export default categoriesSlice.reducer;