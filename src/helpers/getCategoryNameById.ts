import { Category } from "@/types/types";

export const getCategoryNameById = (categoriesList: Category[], id: string): string => {
    // console.log(categoriesList)
    return categoriesList.find(category => category.id === id)?.name || '';
}