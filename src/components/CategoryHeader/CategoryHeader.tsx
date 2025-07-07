import { memo } from "react";
import { Badge, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";
import SearchBar from "../SearchBar/SearchBar";
import { useTranslation } from "react-i18next";

// interfaces
interface CategoryHeaderProp {
    counter: number;

    activeCategoryId: string;
    categoryName: string;
    isSubCategory: boolean;

    onCancelEditProduct: () => void;
    onShowAddProductModal: () => void;
    onShowClearCategoryModal: () => void;
}

export const CategoryHeader = memo(({
                                        counter,

                                        activeCategoryId,
                                        categoryName,
                                        isSubCategory,

                                        onCancelEditProduct,
                                        onShowAddProductModal,
                                        onShowClearCategoryModal
                                    }: CategoryHeaderProp) => {
    const { t } = useTranslation();
    const isAllCategory = activeCategoryId === ALL_CATEGORY_OBJECT.id;

    const openModalAddProduct = () => {
        onCancelEditProduct();
        onShowAddProductModal();
    };

    const openClearModalProduct = () => {
        onShowClearCategoryModal();
    };

    return (
        <div className={`d-flex align-items-center justify-content-between gap-2 ${isAllCategory ? '' : 'mb-4-'}`}>
            <div className="d-flex align-items-center flex-grow-1">
                {!isSubCategory ? (
                    <h4 className={`mb-0 ${isAllCategory ? 'h5 text-uppercase fw-bold me-1' : 'h5 fw-normal me-1'}`}>
                        {categoryName || '!#??'}
                    </h4>
                ) : (
                    <h5 className={`mb-0 ${isAllCategory ? 'h6 text-uppercase fw-bold me-1' : 'h5 fw-normal me-1'}`}>
                        {categoryName || '!#??'}
                    </h5>
                )}

                <Badge bg="secondary">{counter}</Badge>
                <Button
                    variant="light"
                    size="sm"
                    onClick={() => openModalAddProduct()}
                    className="ms-2"
                >
                    <Plus size={16}/>
                    {t('buttons.title.addProduct')}
                </Button>
            </div>
        </div>
    )
});