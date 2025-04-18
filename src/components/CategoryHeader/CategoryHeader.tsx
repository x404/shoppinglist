import { memo, useCallback } from "react";
import { Badge, Button } from "react-bootstrap";

// constants
import { ALL_CATEGORY_NAME } from "@constants/categories";

import { Plus } from "react-bootstrap-icons";
import { useModal } from "../../context/ModalContext";


// interfaces
interface CategoryHeaderProp {
    category: string;
    counter: number;
    activeCategory: string;
    onCancelEditProduct: () => void;
}

export const CategoryHeader = memo(({ category, counter, activeCategory, onCancelEditProduct}: CategoryHeaderProp) => {
    const { openAddProductModal } = useModal();
    
    const isAllCategory = activeCategory === ALL_CATEGORY_NAME;

    const handlerAddProduct = useCallback((category: string) => {
        onCancelEditProduct();
        openAddProductModal(category);
    }, []);


    return (
        <h4 className={`d-flex align-items-center gap-2 ${isAllCategory ? 'h6 text-uppercase' : 'h5 mb-4 fw-normal'}`}>
            <div className={`${isAllCategory ? 'fw-bold' : ''}`}>{category}</div>
            <Badge bg="secondary">{counter}</Badge>
            <Button
                variant="light"
                size="sm"
                onClick={() => handlerAddProduct(category)}
            >
                <Plus size={16}/>
                Add product
            </Button>
        </h4>
    )
});