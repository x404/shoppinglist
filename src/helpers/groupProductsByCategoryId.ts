import { Product, ProductsByCategory } from "@/types/types";

export const groupProductsByCategoryId = (products: Product[]): ProductsByCategory => {
    return products.reduce((acc: ProductsByCategory, item: Product) => {
        if (!acc[item.categoryId]) {
            acc[item.categoryId] = [];
        }
        acc[item.categoryId].push(item);
        return acc;
    }, {} as ProductsByCategory)
}