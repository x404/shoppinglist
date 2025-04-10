export interface Product {
    id: string;
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