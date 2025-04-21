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
    activeCategory: string;
    onCancelEditProduct?: () => void;
}


const NoFoundProducts = ({ products, activeCategory, onCancelEditProduct }: NoFoundProductsProps) => {
    if (products.length > 0) return null;

    const { openAddProductModal } = useModal();
    
    const handleAddProduct = () => {
        const category = activeCategory !== ALL_CATEGORY_OBJECT.name ? activeCategory : undefined;
        openAddProductModal(category);
    };
    
    return (
        <>
            <article className="mb-2">
                <CategoryHeader
                    category={activeCategory}
                    counter={0}
                    activeCategory={activeCategory}
                    onCancelEditProduct={onCancelEditProduct ?? (() => {})}
                />
                <p>No products found</p>
                <Button variant="dark" onClick={handleAddProduct}>Add first product</Button>
            </article>
        </>
    );
}

export default NoFoundProducts;