import { Button } from "react-bootstrap";

// redux
import { useSelector } from "react-redux";
import { selectActiveCategory } from "../../store/productListSlice";

// components
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// styles
import styles from '../MainContent/MainContent.module.css';

// interfaces
import { Product } from "../../types/types";

interface NoFoundProductsProps {
    products: Product[];
    onAddProduct: () => void;
}


const NoFoundProducts = ({ products, onAddProduct }: NoFoundProductsProps) => {
    if (products.length > 0) return;

    const activeCategory = useSelector(selectActiveCategory);

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
            <Button variant="dark" onClick={onAddProduct}>Add first product</Button>
        </article>
        </>
    );
}

export default NoFoundProducts;