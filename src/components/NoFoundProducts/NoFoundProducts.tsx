import { Button } from "react-bootstrap";

// components
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// interfaces
import { Product } from "../../types/types";

interface NoFoundProductsProps {
    products: Product[];
    activeCategory: string;
    onAddProduct: (activeCategory: string | null) => void;
}


const NoFoundProducts = ({ products, activeCategory, onAddProduct }: NoFoundProductsProps) => {
    if (products.length > 0) return;
    
    const handleAddProduct = () => {
        const category = activeCategory !== 'All' ? activeCategory : null;
        onAddProduct(category);
    }
    
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