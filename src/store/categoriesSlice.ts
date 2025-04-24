import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageService } from "@services/LocalStorageService";

// interfaces
import { CategoryListState, Category } from "@/types/types";

// constants
import { DEFAULT_CATEGORIES } from "@constants/categories";
import { ALL_CATEGORY_OBJECT } from "@constants/categories";
import { syncWithLocalStorage } from "../helpers/syncWithLocalStorage";


const LOCAL_STORAGE_CATEGORY_KEY = "categories";
const storedCategories = LocalStorageService.get<Category[]>(LOCAL_STORAGE_CATEGORY_KEY);

const initialState: CategoryListState = {
    categories: Array.isArray(storedCategories) ? storedCategories : DEFAULT_CATEGORIES,
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
        deleteCategory: (state, action) => {
            console.log(action.payload, state);
        },
        clearCategory: (state, action) => {
            console.log(action.payload, state);
        },
        moveCategory: (state, action) => {
            console.log(action.payload, state);
        },
        setActiveCategory: (state, action: PayloadAction<string>) => {
            console.log('action.payload', action.payload);
            state.selectedCategoryId = action.payload;
        }
    }
})


export const { setActiveCategory, addCategory, editCategory } = categoriesSlice.actions;
export const selectActiveCategoryId = (state: { categories: CategoryListState }) => state.categories.selectedCategoryId;
export const selectCategoriesItems = (state: { categories: CategoryListState }) => state.categories.categories;

export default categoriesSlice.reducer;