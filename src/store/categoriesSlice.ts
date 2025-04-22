import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageService } from "@services/LocalStorageService";

// interfaces
import { CategoryListState, Category } from "@/types/types";

// constants
import { DEFAULT_CATEGORIES } from "@constants/categories";
import { ALL_CATEGORY_OBJECT } from "../constants/categories";


const LOCAL_STORAGE_CATEGORY_KEY = "newCategories";
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
            console.log(action.payload, state);
        },
        editCategory: (state, action) => {
            console.log(action.payload, state);
        },
        deleteCategory: (state, action) => {
            console.log(action.payload, state);
        },
        setActiveCategory: (state, action: PayloadAction<string>) => {
            // console.log('action.payload', action.payload);
            state.selectedCategoryId = action.payload;
        }
    }
})


export const { setActiveCategory } = categoriesSlice.actions;
export const selectActiveCategory = (state: { categories: CategoryListState }) => state.categories.selectedCategoryId;
export const selectCategoriesItems = (state: { categories: CategoryListState }) => state.categories.categories;

export default categoriesSlice.reducer;