import { Button } from "react-bootstrap";

import { useModal } from "@context/AddProductModalContext";

// components
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// interfaces
import { Product } from "@/types/types";
import { useSelector } from "react-redux";
import { selectCategoriesItems } from "../../store/categoriesSlice";
import { getCategoryNameById } from "../../helpers/getCategoryNameById";

interface NoFoundProductsProps {
    products: Product[];
    activeCategoryId: string;
    onCancelEditProduct?: () => void;
}

const NoFoundProducts = ({
                             products,
                             activeCategoryId,
                             onCancelEditProduct
                         }: NoFoundProductsProps) => {
    if (products.length > 0) return null;

    const categoriesList = useSelector(selectCategoriesItems);
    const { openAddProductModal } = useModal();
    
    const allCategoryId = ALL_CATEGORY_OBJECT.id;
    const handleShowAddProductModal = () => {
        const categoryId = activeCategoryId !== allCategoryId ? activeCategoryId : undefined;
        openAddProductModal(categoryId);
    };

    const categoryName = getCategoryNameById(categoriesList, activeCategoryId) || ALL_CATEGORY_OBJECT.name;

    return (
        <>
            <article className="mb-2">
                <CategoryHeader
                    counter={0}

                    activeCategoryId={activeCategoryId}
                    categoryName={categoryName}

                    onCancelEditProduct={onCancelEditProduct ?? (() => {})}
                    onShowAddProductModal={handleShowAddProductModal}
                />
                <p>No products found</p>
                <Button variant="dark" onClick={handleShowAddProductModal}>Add first product</Button>
            </article>
        </>
    );
}

export default NoFoundProducts;