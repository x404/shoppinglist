import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageService } from "@services/LocalStorageService";

// interfaces
import { CategoryListState } from "@/types/types";

// constants
import { DEFAULT_CATEGORIES } from "@constants/categories";

const LOCAL_STORAGE_CATEGORY_KEY = "categories";
const storedCategories = LocalStorageService.get<string[]>(LOCAL_STORAGE_CATEGORY_KEY);


const initialState: CategoryListState = {
    categories: Array.isArray(storedCategories) ? storedCategories : DEFAULT_CATEGORIES,
    selectedCategory: 'All'
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
            state.selectedCategory = action.payload;
        }
    }
})


export const { setActiveCategory } = categoriesSlice.actions;
export const selectActiveCategory = (state: { categories: CategoryListState }) => state.categories.selectedCategory;
export const selectCategoriesItems = (state: { categories: CategoryListState }) => state.categories.categories;

export default categoriesSlice.reducer;