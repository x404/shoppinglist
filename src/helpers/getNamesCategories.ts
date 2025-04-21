import { Category } from "@/types/types";

export const getNamesCategories = (categories: Category[]): string[] => {
    const categoriesList = new Set(categories.map(category => category.name));
    return Array.from(categoriesList);
}