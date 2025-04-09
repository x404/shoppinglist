import { memo } from "react";

// components
import ProductItem from "./ProductItem/ProductItem";
import { CategoryHeader } from "./CategoryHeader/CategoryHeader";

// interfaces
import { Product } from "../types/types";

interface GroupedProductListProps {
    groupedProducts: Record<string, Product[]>;
    editingProductId: string | null;
    categoriesList: string[];
    activeCategory: string;
    onAddProduct: (category?: string) => void;
    onEditProduct: (id: string) => void;
    onDeleteProduct: (id: string) => void;
    onTogglePurchasedProduct: (id: string) => void;
    onCancelEditProduct: () => void;
    onSaveEditProduct: (product: Product) => void;
}

const GroupedProductList = memo(({
                                     groupedProducts,
                                     editingProductId,
                                     categoriesList,
                                     activeCategory,
                                     onAddProduct,
                                     onEditProduct,
                                     onDeleteProduct,
                                     onTogglePurchasedProduct,
                                     onCancelEditProduct,
                                     onSaveEditProduct
                                 }: GroupedProductListProps) => {
    return (
        <>
            {Object.entries(groupedProducts).map(([category, products]) => (
                <article className="mb-3 mb-sm-2" key={category}>
                    <CategoryHeader
                        category={category}
                        activeCategory={activeCategory}
                        counter={products.length}
                        onAddProduct={onAddProduct}
                    />

                    <ul className="list-group mt-2" aria-label={category}>
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
            ))}
        </>
    );
});

export default GroupedProductList;