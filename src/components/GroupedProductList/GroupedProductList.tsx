import { useSelector } from "react-redux";
import { useMemo } from "react";

// components
import ProductItem from "../ProductItem/ProductItem";
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// redux
import { selectTreeCategories } from "@store/categoriesSlice";
import { selectCategoriesItems } from "@store/categoriesSlice";
import { useAddProductModal } from "@context/AddProductModalContext";
import { useClearCategoryModal } from "@context/ClearCategoryModalContext";

// interfaces
import { Product } from "@/types/types";
import { CategoryTreeNode } from "@/types/types";

import { ALL_CATEGORY_OBJECT } from "@constants/categories";
import { getAllNestedCategoryIds } from "@helpers/categoryTreeHelpers";

interface GroupedProductListProps {
    groupedProducts: Record<string, Product[]>;
    editingProductId: string | undefined;
    activeCategoryId: string;
    onEditProduct: (id: string) => void;
    onDeleteProduct: (id: string) => void;
    onTogglePurchasedProduct: (id: string) => void;
    onCancelEditProduct: () => void;
    onSaveEditProduct: (product: Product) => void;
}

interface CategoryHeaderWrapperProps {
    activeCategoryId: string;
    categoryId: string;
    categoryName: string;
    counter: number;
    onCancelEditProduct: () => void;
    onShowAddProductModal: () => void;
    onShowClearCategoryModal: () => void;
}


const CategoryHeaderWrapper = ({
                                   activeCategoryId,
                                   categoryName,
                                   counter,
                                   onCancelEditProduct,
                                   onShowAddProductModal,
                                   onShowClearCategoryModal
                               }: CategoryHeaderWrapperProps) => {
    // if (activeCategoryId !== ALL_CATEGORY_OBJECT.id) return null;

    return (
        <CategoryHeader
            counter={counter}
            activeCategoryId={activeCategoryId}
            categoryName={categoryName}
            isSubCategory={false}
            onCancelEditProduct={onCancelEditProduct}
            onShowAddProductModal={onShowAddProductModal}
            onShowClearCategoryModal={onShowClearCategoryModal}
        />
    );
};


const GroupedProductList = ({
                                groupedProducts,
                                editingProductId,
                                activeCategoryId,
                                onEditProduct,
                                onDeleteProduct,
                                onTogglePurchasedProduct,
                                onCancelEditProduct,
                                onSaveEditProduct
                            }: GroupedProductListProps) => {

    const categoriesList = useSelector(selectCategoriesItems);
    const categoriesTree = useSelector(selectTreeCategories);

    const { openAddProductModal } = useAddProductModal();
    const { openClearCategoryModal } = useClearCategoryModal();

    const handleShowAddProductModal = (categoryId?: string) => {
        // const categoryId = activeCategoryId !== allCategoryId ? activeCategoryId : undefined;
        openAddProductModal(categoryId);
    };

    const handleShowClearCategoryModal = (categoryId: string) => {
        openClearCategoryModal(categoryId)
    }

    const visibleCategoryIds = useMemo(() => {
        return activeCategoryId === ALL_CATEGORY_OBJECT.id
            ? Object.keys(groupedProducts)
            : getAllNestedCategoryIds(categoriesTree, activeCategoryId);
    }, [activeCategoryId, categoriesTree, groupedProducts]);


    // console.log(groupProductsByCategory())
    // console.log(groupedProducts)
    // console.log(categoriesTree, activeCategoryId);
    // console.log(categoriesList.filter(category => category.parentId === activeCategoryId));

    // const obj = Object.entries(groupedProducts)
    //                   .filter(([categoryId]) => visibleCategoryIds.includes(categoryId))
    //                   .map(([categoryId, products]: [string, Product[]]) => {
    //                           // console.log( categoriesList.find(category => category.id === categoryId)?.name, products);
    //                   }
    //                   )
    // console.log(obj);

    const categories = useMemo(() => {
        return [...categoriesTree];
    }, [categoriesList]);


    const addProductsToCategories = (categories: CategoryTreeNode[]): CategoryTreeNode[] => {
        categories.forEach(category => {
            category.products = groupedProducts[category.id] || [];

            if (category.children && category.children.length > 0) {
                addProductsToCategories(category.children);
            }
        });

        return categories;
    };

    const catWithProducts = addProductsToCategories(categories);
    

    return (
        <>
            {Object.entries(groupedProducts)
                   .filter(([categoryId]) => visibleCategoryIds.includes(categoryId))
                   .map(([categoryId, products]: [string, Product[]]) => {
                       const categoryName = categoriesList.find(category => category.id === categoryId)?.name || 'Others';
                       return (
                           <article className={`mb-3 mb-sm-2 mb-lg-3 ${activeCategoryId !== categoryId ? 'ms-' : ''}`}
                                    key={categoryId}>

                               {activeCategoryId !== categoryId && (
                                   <CategoryHeaderWrapper
                                       categoryId={categoryId}
                                       activeCategoryId={activeCategoryId}
                                       categoryName={categoryName}
                                       counter={products.length}
                                       onCancelEditProduct={onCancelEditProduct}
                                       onShowAddProductModal={() => handleShowAddProductModal(categoryId)}
                                       onShowClearCategoryModal={() => handleShowClearCategoryModal(categoryId)}
                                   />
                               )}


                               <ul className="list-group mt-2" aria-label={categoryId}>
                                   {products.map(product => (
                                       <ProductItem
                                           key={product.id}
                                           product={product}
                                           isEditingProduct={editingProductId === product.id}
                                           categoriesList={categoriesList}
                                           onEditProduct={onEditProduct}
                                           onDeleteProduct={onDeleteProduct}
                                           onTogglePurchasedProduct={onTogglePurchasedProduct}
                                           onCancelEditProduct={onCancelEditProduct}
                                           onSaveEditProduct={onSaveEditProduct}
                                       />
                                   ))}
                               </ul>
                           </article>
                       );
                   })}
        </>
    );
};

export default GroupedProductList;