import { Button } from "react-bootstrap";

// components
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// interfaces
import { Product } from "../../types/types";

interface NoFoundProductsProps {
    products: Product[];
    activeCategory: string;
    onAddProduct: (activeCategory: string) => void;
}


const NoFoundProducts = ({ products, activeCategory, onAddProduct }: NoFoundProductsProps) => {
    if (products.length > 0) return;
    
    const onEmitAddProduct = () => {
        onAddProduct(activeCategory);    
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
                <Button variant="dark" onClick={onEmitAddProduct}>Add first product</Button>
            </article>
        </>
    );
}

export default NoFoundProducts;