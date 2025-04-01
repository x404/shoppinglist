export interface Product {
    id: number;
    name: string;
    category: string;
    purchased: boolean;
    quantity: number;
}

export interface ProductListState {
    products: Product[];
    categories: string[];
    selectedCategory: string;
}

export interface ProductsByCategory {
    [category: string]: Product[];
}