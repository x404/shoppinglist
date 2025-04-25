import { Product, Category } from "../types/types";
import { LocalStorageService } from "../services/LocalStorageService";

export const syncWithLocalStorage = (key: string, data: Product[] | Category[]): void => {
    try {
        if (Array.isArray(data)) {
            LocalStorageService.set(key, data);
        }
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};