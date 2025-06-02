export interface Product {
    id: string;  // UUID
    name: string;
    purchased: boolean;
    quantity: number;
    categoryId: string;
    subCategoryId?: string;
}

export interface ProductListState {
    products: Product[];
}

interface CategoryProperties {
    icon?: string;
    color?: string;
}

export interface Category{
    id: string; // UUID
    name: string;
    categoryProperties?: CategoryProperties;
    parentId: string | null;
    children?: Category[];
}

export type CategoryTreeNode = Category & {
    children: CategoryTreeNode[];
};

export interface CategoryListState {
    categories: Category[];
    selectedCategoryId: string;
}

export interface ProductsByCategory {
    [category: string]: Product[];
}