import { Product } from "../../types/types";
import { LocalStorageService } from "../../services/LocalStorageService";

export const syncWithLocalStorage = (key: string, productList: Product[]): void => {
    try {
        if (Array.isArray(productList)) {
            LocalStorageService.set(key, productList);
        }
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};