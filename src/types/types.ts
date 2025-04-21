export interface Product {
    id: string;
    name: string;
    category: string;
    purchased: boolean;
    quantity: number;
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

export interface CategoryListState {
    categories: Category[];
    selectedCategory: string;
}

export interface ProductsByCategory {
    [category: string]: Product[];
}