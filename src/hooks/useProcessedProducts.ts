import { Product } from "@/types/types";
import { useSelector } from "react-redux";
import { ALL_CATEGORY_OBJECT } from "@constants/categories";
import { getAllNestedCategoryIds, groupProductsByCategory } from "@helpers/categoryTreeHelpers";
import { selectTreeCategories } from "@store/categoriesSlice";

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

    const visibleCategoryIds =
        activeCategoryId === ALL_CATEGORY_OBJECT.id
            ? null
            : getAllNestedCategoryIds(categoriesTree, activeCategoryId);


    const filteredByCategory =
        activeCategoryId === ALL_CATEGORY_OBJECT.id
            ? productList
            : productList.filter(product => visibleCategoryIds?.includes(product.categoryId));


    const filteredBySearch = debouncedSearchText
        ? filteredByCategory.filter(product =>
            product.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
        )
        : filteredByCategory;


    const filteredByHiddenStatus = hiddenItemsStatus
        ? filteredBySearch.filter(product => !product.purchased)
        : filteredBySearch;


    const sortedProducts = (!sortField || !sortDirection)
        ? filteredByHiddenStatus
        : [...filteredByHiddenStatus].sort((a, b) => {
            const aValue = a[sortField as keyof Product];
            const bValue = b[sortField as keyof Product];
            const directionFactor = sortDirection === "asc" ? 1 : -1;

            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * directionFactor;
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
                return (aValue - bValue) * directionFactor;
            }

            return 0;
        });

    const groupedProducts = groupProductsByCategory(sortedProducts);

    return {
        filteredProducts: sortedProducts,
        groupedProducts
    };
};