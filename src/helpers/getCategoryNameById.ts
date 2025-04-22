import { Category } from "../types/types";

export const getCategoryNameById = (categoriesList: Category[], id: string): string => {
    return categoriesList.find(category => category.id === id)?.name || 'Others';
}