import { Button } from "react-bootstrap";

// components
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// constants
import { ALL_CATEGORY_NAME } from "@constants/categories";

// interfaces
import { Product } from "@/types/types";

interface NoFoundProductsProps {
    products: Product[];
    activeCategory: string;
    onAddProduct: (activeCategory: string | undefined) => void;
}


const NoFoundProducts = ({ products, activeCategory, onAddProduct }: NoFoundProductsProps) => {
    if (products.length > 0) return;
    
    const handleAddProduct = () => {
        const category = activeCategory !== ALL_CATEGORY_NAME ? activeCategory : undefined;
        onAddProduct(category);
    };
    
    return (
        <>
            <article className="mb-2">
                <CategoryHeader
                    category={activeCategory}
                    counter={0}
                    activeCategory={activeCategory}
                    onAddProduct={onAddProduct}
                />
                <p>No products found</p>
                <Button variant="dark" onClick={handleAddProduct}>Add first product</Button>
            </article>
        </>
    );
}

export default NoFoundProducts;