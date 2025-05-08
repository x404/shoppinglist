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

    return (
        <>
            {Object.entries(groupedProducts).map(([categoryId, products]: [string, Product[]]) => {
                const categoryName = categoriesList.find(category => category.id === categoryId)?.name || 'Others';
                return (

                    <article className="mb-3 mb-sm-2 mb-lg-3" key={categoryId}>
                        {activeCategoryId === ALL_CATEGORY_OBJECT.id && (
                            <CategoryHeader
                                counter={products.length}

                                activeCategoryId={activeCategoryId}
                                categoryName={categoryName}

                                onCancelEditProduct={onCancelEditProduct}
                                onShowAddProductModal={() => handleShowAddProductModal(categoryId)}
                                onShowClearCategoryModal={() => handleShowClearCategoryModal(categoryId)}
                            />)}

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
        </>
    );
};

export default GroupedProductList;