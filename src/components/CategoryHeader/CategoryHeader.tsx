import { memo, useCallback } from "react";
import { Badge, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

import { useModal } from "../../context/ModalContext";


// interfaces
interface CategoryHeaderProp {
    categoryId: string;
    categoryName: string;
    activeCategoryId: string;
    counter: number;
    onCancelEditProduct: () => void;
}

export const CategoryHeader = memo(({
                                        categoryId,
                                        categoryName,
                                        activeCategoryId,
                                        counter,
                                        onCancelEditProduct
                                    }: CategoryHeaderProp) => {
    const { openAddProductModal } = useModal();

    const isAllCategory = activeCategoryId === ALL_CATEGORY_OBJECT.id;

    const handlerAddProduct = useCallback((categoryId: string) => {
        onCancelEditProduct();
        openAddProductModal(categoryId);
    }, []);

    return (
        <h4 className={`d-flex align-items-center gap-2 ${isAllCategory ? 'h6 text-uppercase' : 'h5 mb-4 fw-normal'}`}>
            {/*<div className={`${isAllCategory ? 'fw-bold' : ''}`}>{categoryId}  -{categoryName} - {activeCategoryId}</div>*/}
            <div className={`${isAllCategory ? 'fw-bold' : ''}`}>{categoryName || '!#??'}</div>
            <Badge bg="secondary">{counter}</Badge>
            <Button
                variant="light"
                size="sm"
                onClick={() => handlerAddProduct(categoryId)}
            >
                <Plus size={16}/>
                Add product
            </Button>
        </h4>
    )
});