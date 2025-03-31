export interface Product {
    id: string;
    name: string;
    category: string;
    purchased: boolean;
    quantity: string;
}

export interface ProductListState {
    products: Product[];
    categories: string[];
}

export interface ProductsByCategory {
    [category: string]: Product[];
}