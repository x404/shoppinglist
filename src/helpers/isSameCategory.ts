import { Category } from '@/types/types';

export const isSameCategory = (a: Category, b: Category): boolean => {
    return (
        a.name === b.name
    );
};