import { act, memo } from "react";

// components
import ProductItem from "./ProductItem/ProductItem";
import { CategoryHeader } from "./CategoryHeader/CategoryHeader";

// interfaces
import { Product } from "@/types/types";
import { useSelector } from "react-redux";
import { selectCategoriesItems } from "../store/categoriesSlice";

interface GroupedProductListProps {
    groupedProducts: Record<string, Product[]>;
    editingProductId: string | null;
    activeCategoryId: string;
    onEditProduct: (id: string) => void;
    onDeleteProduct: (id: string) => void;
    onTogglePurchasedProduct: (id: string) => void;
    onCancelEditProduct: () => void;
    onSaveEditProduct: (product: Product) => void;
}

const GroupedProductList = memo(({
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
    
    return (
        <>
            {Object.entries(groupedProducts).map(([categoryId, products] : [string, Product[]] ) => {
                const categoryName = categoriesList.find(category => category.id === activeCategoryId)?.name || 'Others';
                return (

                    <article className="mb-3 mb-sm-2" key={categoryId}>
                        <CategoryHeader
                            categoryId={categoryId}
                            categoryName={categoryName}

                            activeCategoryId={activeCategoryId}
                            counter={products.length}
                            onCancelEditProduct={onCancelEditProduct}
                        />

                        <ul className="list-group mt-2" aria-label={categoryId}>
                            {products.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    isEditing={editingProductId === product.id}
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
});

export default GroupedProductList;