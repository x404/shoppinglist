import { Product } from "../../types/types";

export const getNamesCategories = (productList: Product[]): string[] => {
    // const categories = new Set(productList.map(product => product.category));
    // return Array.from(categories);
    console.log(productList);
    return ['Fruits', 'Vegetables', 'Dairy'];
}