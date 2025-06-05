// components
import ProductItem from "../ProductItem/ProductItem";
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// redux
import { selectCategoriesItems } from "@store/categoriesSlice";
import { useAddProductModal } from "@context/AddProductModalContext";
import { useClearCategoryModal } from "@context/ClearCategoryModalContext";

// interfaces
import { Product } from "@/types/types";
import { useSelector } from "react-redux";

import { ALL_CATEGORY_OBJECT } from "@constants/categories";

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
    if (activeCategoryId !== ALL_CATEGORY_OBJECT.id) return null;

    return (
        <CategoryHeader
            counter={counter}
            activeCategoryId={activeCategoryId}
            categoryName={categoryName}
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
    const { openAddProductModal } = useAddProductModal();
    const { openClearCategoryModal } = useClearCategoryModal();

    const handleShowAddProductModal = (categoryId?: string) => {
        // const categoryId = activeCategoryId !== allCategoryId ? activeCategoryId : undefined;
        openAddProductModal(categoryId);
    };

    const handleShowClearCategoryModal = (categoryId: string) => {
        openClearCategoryModal(categoryId)
    }

    console.log(groupedProducts)

    return (
        <>
            {Object.entries(groupedProducts).map(([categoryId, products]: [string, Product[]]) => {
                const categoryName = categoriesList.find(category => category.id === categoryId)?.name || 'Others';
                return (
                    <article className="mb-3 mb-sm-2 mb-lg-3" key={categoryId}>
                        <CategoryHeaderWrapper
                            categoryId={categoryId}
                            activeCategoryId={activeCategoryId}
                            categoryName={categoryName}
                            counter={products.length}
                            onCancelEditProduct={onCancelEditProduct}
                            onShowAddProductModal={() => handleShowAddProductModal(categoryId)}
                            onShowClearCategoryModal={() => handleShowClearCategoryModal(categoryId)}
                        />

                        <ul className="list-group mt-2" aria-label={categoryId}>
                            {products.map((product) => (
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
                )
            })}
            
            <section className="ps-2 mt-4">
                <h5 className="h6">Subcategories</h5>
                
            </section>
        </>
    );
};

export default GroupedProductList;