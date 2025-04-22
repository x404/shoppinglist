import { Button } from "react-bootstrap";

import { useModal } from "@context/ModalContext";

// components
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// interfaces
import { Product } from "@/types/types";

interface NoFoundProductsProps {
    products: Product[];
    categoryId: string;
    categoryName: string;
    activeCategoryId: string;
    onCancelEditProduct?: () => void;
}


const NoFoundProducts = ({ products, categoryId, categoryName, activeCategoryId, onCancelEditProduct }: NoFoundProductsProps) => {
    if (products.length > 0) return null;

    const { openAddProductModal } = useModal();
    
    const handleAddProduct = () => {
        const category = activeCategoryId !== ALL_CATEGORY_OBJECT.id ? activeCategoryId : undefined;
        openAddProductModal(category);
    };
    
    return (
        <>
            <article className="mb-2">
                <CategoryHeader
                    
                    categoryId={categoryId}
                    categoryName={categoryName}
                    
                    counter={0}
                    activeCategoryId={activeCategoryId}
                    onCancelEditProduct={onCancelEditProduct ?? (() => {})}
                />
                <p>No products found</p>
                <Button variant="dark" onClick={handleAddProduct}>Add first product</Button>
            </article>
        </>
    );
}

export default NoFoundProducts;