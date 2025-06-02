import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageService } from "@services/LocalStorageService";

// interfaces
import { CategoryListState, Category } from "@/types/types";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";
import { syncWithLocalStorage } from "@helpers/syncWithLocalStorage";
import { buildCategoryTree } from "@helpers/categoryTreeHelpers";


const LOCAL_STORAGE_CATEGORY_KEY = "categories";
const storedCategories = LocalStorageService.get<Category[]>(LOCAL_STORAGE_CATEGORY_KEY);


const updateCategoryState = (state: CategoryListState) => {
    syncWithLocalStorage(LOCAL_STORAGE_CATEGORY_KEY, state.categories);
};


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
            updateCategoryState(state);

        },
        editCategory: (state, action) => {
            const { id, name } = action.payload;
            const updCategories = state.categories.map(category =>
                category.id === id
                    ? { ...category, name }
                    : category
            );
            state.categories = updCategories;
            updateCategoryState(state);

        },
        deleteCategoryById: (state, action: PayloadAction<string[]>) => {
            const idsToDelete = new Set(action.payload);
            state.categories = state.categories.filter(category => !idsToDelete.has(category.id));
            updateCategoryState(state);
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

export const selectTreeCategories = createSelector(
    [selectCategoriesItems],
    (categories) => buildCategoryTree(categories)
);

export default categoriesSlice.reducer;