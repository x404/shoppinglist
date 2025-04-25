import { Product } from '../types/types';

export const isSameProduct = (a: Product, b: Product): boolean => {
    return (
        a.name === b.name &&
        a.quantity === b.quantity &&
        a.categoryId === b.categoryId
    );
};