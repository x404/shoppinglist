import { Button } from "react-bootstrap";

import { useAddProductModal } from "@context/AddProductModalContext";

// components
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// interfaces
import { Product } from "@/types/types";
import { useSelector } from "react-redux";
import { selectCategoriesItems } from "../../store/categoriesSlice";
import { getCategoryNameById } from "../../helpers/getCategoryNameById";
import { useMemo } from "react";

interface NoFoundProductsProps {
    products: Product[];
    activeCategoryId: string;
    onCancelEditProduct?: () => void;
}

const NoFoundProducts = ({
                             activeCategoryId,
                             onCancelEditProduct
                         }: NoFoundProductsProps) => {
    const categoriesList = useSelector(selectCategoriesItems);
    const { openAddProductModal } = useAddProductModal();
    
    // if (products.length > 0) return null;
    
    const allCategoryId = ALL_CATEGORY_OBJECT.id;
    const handleShowAddProductModal = () => {
        const categoryId = activeCategoryId !== allCategoryId ? activeCategoryId : undefined;
        openAddProductModal(categoryId);
    };

    const categoryName = useMemo(() => (
        getCategoryNameById(categoriesList, activeCategoryId) || ALL_CATEGORY_OBJECT.name
    ), [categoriesList, activeCategoryId]);

    
    return (
        <>
            <article className="mb-2">
                <CategoryHeader
                    counter={0}

                    activeCategoryId={activeCategoryId}
                    categoryName={categoryName}

                    onCancelEditProduct={onCancelEditProduct ?? (() => {
                    })}
                    onShowAddProductModal={handleShowAddProductModal}
                />
                <p>No products found</p>
                <Button variant="dark" onClick={handleShowAddProductModal}>Add first product</Button>
            </article>
        </>
    );
}

export default NoFoundProducts;