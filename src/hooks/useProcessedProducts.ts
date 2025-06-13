import { useMemo } from "react";
import { Product } from "@/types/types";
import { useSelector } from "react-redux";
import { ALL_CATEGORY_OBJECT } from "@constants/categories";
import { getAllNestedCategoryIds, groupProductsByCategory } from "../helpers/categoryTreeHelpers";
import { selectTreeCategories } from "../store/categoriesSlice";

interface UseProcessedProductsParams {
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
                                     }: UseProcessedProductsParams) => {
    const categoriesTree = useSelector(selectTreeCategories);

    const visibleCategoryIds = useMemo(() => {
        return activeCategoryId === ALL_CATEGORY_OBJECT.id
            ? null
            : getAllNestedCategoryIds(categoriesTree, activeCategoryId);
    }, [activeCategoryId, categoriesTree]);

    const filteredByCategory = useMemo(() => {
        if (activeCategoryId === ALL_CATEGORY_OBJECT.id) {
            return productList;
        }
        return productList.filter(product => visibleCategoryIds?.includes(product.categoryId));
    }, [productList, activeCategoryId, visibleCategoryIds]);

    const filteredBySearch = useMemo(() => {
        if (!debouncedSearchText) return filteredByCategory;
        return filteredByCategory.filter(product =>
            product.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
        );
    }, [filteredByCategory, debouncedSearchText]);

    const filteredByHiddenStatus = useMemo(() => {
        return hiddenItemsStatus
            ? filteredBySearch.filter(product => !product.purchased)
            : filteredBySearch;
    }, [filteredBySearch, hiddenItemsStatus]);

    const sortedProducts = useMemo(() => {
        if (!sortField || !sortDirection) return filteredByHiddenStatus;

        const directionFactor = sortDirection === "asc" ? 1 : -1;

        return [...filteredByHiddenStatus].sort((a, b) => {
            const aValue = a[sortField as keyof Product];
            const bValue = b[sortField as keyof Product];

            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * directionFactor;
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
                return (aValue - bValue) * directionFactor;
            }

            return 0;
        });
    }, [filteredByHiddenStatus, sortField, sortDirection]);

    const groupedProducts = useMemo(() => {
        return groupProductsByCategory(sortedProducts);
    }, [sortedProducts]);

    return {
        filteredProducts: sortedProducts,
        groupedProducts
    };
};