import { LocalStorageService } from "../../services/LocalStorageService";

export const getCategories = () => {
    const DEFAULT_CATEGORIES = ['Fruits', 'Vegetables', 'Dairy'];
    const categories = LocalStorageService.get<string[]>('categories');
    return Array.isArray(categories) && categories.length > 0 ? categories : DEFAULT_CATEGORIES;
}