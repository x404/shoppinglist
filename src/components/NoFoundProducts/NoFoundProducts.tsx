import { Button } from "react-bootstrap";
import styles from '../MainContent/MainContent.module.css';
import { Product } from "../../types/types";

interface NoFoundProductsProps {
    products: Product[];
    onAddProduct: () => void;
}

const NoFoundProducts = ({ products, onAddProduct }: NoFoundProductsProps) => {
    if (products.length > 0) return;

    return (
        <main className={`${styles.main} p-3`} id="main">
            <section className="bg-white shadow-sm p-4 mt-1 shadow-sm">
                <p>No products found</p>
                <Button variant="dark" onClick={onAddProduct}>Add first product</Button>
            </section>
        </main>
    );
}

export default NoFoundProducts;