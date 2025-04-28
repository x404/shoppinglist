import { Product } from "../types/types";

export const getProductCountByCategoryId = (productList: Product[], categoryId: string): number => {
    return productList.filter(product => product.categoryId === categoryId).length;
};