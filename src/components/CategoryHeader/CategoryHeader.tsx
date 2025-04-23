import { memo, useCallback } from "react";
import { Badge, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// interfaces
interface CategoryHeaderProp {
    counter: number;

    activeCategoryId: string;
    categoryName: string;

    onCancelEditProduct: () => void;
    onShowAddProductModal: () => void;
}

export const CategoryHeader = memo(({
                                        counter,

                                        activeCategoryId,
                                        categoryName,

                                        onCancelEditProduct,
                                        onShowAddProductModal
                                    }: CategoryHeaderProp) => {
    const isAllCategory = activeCategoryId === ALL_CATEGORY_OBJECT.id;

    const openModalAddProduct = useCallback(() => {
        onCancelEditProduct();
        onShowAddProductModal()
    }, [activeCategoryId]);

    return (
        <h4 className={`d-flex align-items-center gap-2 ${isAllCategory ? 'h6 text-uppercase' : 'h5 mb-4 fw-normal'}`}>
            <div className={`${isAllCategory ? 'fw-bold' : ''}`}>
                {categoryName || '!#??'}
            </div>
            <Badge bg="secondary">{counter}</Badge>
            <Button
                variant="light"
                size="sm"
                onClick={() => openModalAddProduct()}
            >
                <Plus size={16}/>
                Add product
            </Button>
        </h4>
    )
});