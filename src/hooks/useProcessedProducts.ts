import { useMemo } from "react";
import { ALL_CATEGORY_OBJECT } from "@constants/categories";
import { Product } from "@/types/types";
import { groupProductsByCategoryId } from "@helpers/groupProductsByCategoryId";

interface Params {
    productList: Product[];
    activeCategoryId: string;
    debouncedSearchText: string;
    sortField: string;
    sortDirection: string;
    hiddenItemsStatus: boolean;
}

export const useProcessedProducts = ({
                                         productList,
                                         activeCategoryId,
                                         debouncedSearchText,
                                         sortField,
                                         sortDirection,
                                         hiddenItemsStatus
                                     }: Params) => {

    const showOnlyUnhiddenStatusItems = (products: Product[]) =>
        products.filter(p => !p.purchased);

    const filteredProducts = useMemo(() => {
        let products = hiddenItemsStatus ? showOnlyUnhiddenStatusItems(productList) : productList;
        const isAllCategory = activeCategoryId === ALL_CATEGORY_OBJECT.id;
        
        const byCategory = isAllCategory
            ? products
            : products.filter(product => product.categoryId === activeCategoryId);

        
        const normalizedSearch = debouncedSearchText.trim().toLowerCase();
        return normalizedSearch.length === 0
            ? byCategory
            : byCategory.filter(p => p.name.toLowerCase().includes(normalizedSearch));
    }, [productList, activeCategoryId, debouncedSearchText, hiddenItemsStatus]);

    const sortedProducts = useMemo(() => {
        if (!sortField || !sortDirection) return filteredProducts;

        return [...filteredProducts].sort((a, b) => {
            let valueA: string | number = sortField === 'name' ? a.name.toLowerCase() : a.purchased ? 1 : 0;
            let valueB: string | number = sortField === 'name' ? b.name.toLowerCase() : b.purchased ? 1 : 0;

            return sortDirection === 'asc'
                ? valueA > valueB ? 1 : -1
                : valueA < valueB ? 1 : -1;
        });
    }, [filteredProducts, sortField, sortDirection]);

    const groupedProducts = useMemo(() => {
        return groupProductsByCategoryId(sortedProducts);
    }, [sortedProducts]);

    return {
        filteredProducts,
        sortedProducts,
        groupedProducts
    };
};