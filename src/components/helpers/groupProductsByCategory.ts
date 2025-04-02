import { Product, ProductsByCategory } from "../../types/types";

export const groupProductsByCategory = (products: Product[]): ProductsByCategory => {
    return products.reduce((acc: ProductsByCategory, item: Product) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as ProductsByCategory)
}