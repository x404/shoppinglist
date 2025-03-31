export class LocalStorageService {
    /**
     * Stores a value in localStorage under the specified key.
     * Converts the value to JSON format before saving.
     *
     * @param key - The key under which the value will be stored.
     * @param value - The value to store.
     */
    static set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving to localStorage with key "${key}":`, error);
        }
    }

    /**
     * Retrieves a value from localStorage by the specified key.
     * Parses the JSON value before returning it.
     *
     * @param key - The key to retrieve the value from.
     * @returns The parsed value or null if the key is not found.
     */
    static get<T>(key: string): T | null {
        try {
            const value = localStorage.getItem(key);
            return value ? (JSON.parse(value) as T) : null;
        } catch (error) {
            console.error(`Error reading from localStorage with key "${key}":`, error);
            return null;
        }
    }

    /**
     * Removes an item from localStorage by its key.
     *
     * @param key - The key of the item to remove.
     */
    static remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing from localStorage with key "${key}":`, error);
        }
    }

    /**
     * Checks if an item exists in localStorage under the specified key.
     *
     * @param key - The key to check.
     * @returns True if the key exists, false otherwise.
     */
    static has(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    /**
     * Clears all items from localStorage.
     */
    static clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    }
}