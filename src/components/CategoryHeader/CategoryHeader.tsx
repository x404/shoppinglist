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
    onShowClearCategoryModal: () => void;
}

export const CategoryHeader = memo(({
                                        counter,

                                        activeCategoryId,
                                        categoryName,

                                        onCancelEditProduct,
                                        onShowAddProductModal,
                                        onShowClearCategoryModal
                                    }: CategoryHeaderProp) => {
    const isAllCategory = activeCategoryId === ALL_CATEGORY_OBJECT.id;

    const openModalAddProduct = useCallback(() => {
        onCancelEditProduct();
        onShowAddProductModal()
    }, [activeCategoryId]);

    const openClearModalProduct = useCallback(() => {
        onShowClearCategoryModal();
    }, [activeCategoryId])

    return (
        <div className={`d-flex align-items-center gap-2 ${isAllCategory ? '' : 'mb-4'}`}>
            <h4 className={`mb-0 ${isAllCategory ? 'h6 text-uppercase fw-bold' : 'h5 fw-normal'}`}>
                {categoryName || '!#??'}
            </h4>
            <Badge bg="secondary">{counter}</Badge>
            <Button
                variant="light"
                size="sm"
                onClick={() => openModalAddProduct()}
            >
                <Plus size={16}/>
                Add product
            </Button>


            {/*{ isAllCategory && counter > 0 && (*/}
            {/*    <Button*/}
            {/*        variant="light"*/}
            {/*        size="sm"*/}
            {/*        onClick={() => openClearModalProduct()}*/}
            
            {/*    >*/}
            {/*        Clear catalog*/}
            {/*    </Button>*/}
            {/*)}*/}
        </div>
    )
});