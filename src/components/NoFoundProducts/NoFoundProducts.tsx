import { ChangeEvent, Dispatch, SetStateAction, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useAddProductModal } from "@context/AddProductModalContext";

// components
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// helpers
import { getCategoryNameById } from "@helpers/getCategoryNameById";

// redux
import { selectCategoriesItems } from "@store/categoriesSlice";

// interfaces
import { Product } from "@/types/types";
import ViewToolbar from "../ViewToolbar/ViewToolbar";


interface NoFoundProductsProps {
    products: Product[];
    activeCategoryId: string;
    onCancelEditProduct?: () => void;

    sortField: string;
    sortDirection: string;
    hiddenItemsStatus: boolean;
    handleSortFieldChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    handleSortDirectionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    handleChangeHiddingStatus: (event: ChangeEvent<HTMLInputElement>) => void;
    handleClearSorting: () => void;
    showPopover: boolean;
    setShowPopover: Dispatch<SetStateAction<boolean>>;


}

const NoFoundProducts = ({
                             activeCategoryId,
                             onCancelEditProduct,

                             sortField,
                             sortDirection,
                             hiddenItemsStatus,
                             handleSortFieldChange,
                             handleSortDirectionChange,
                             handleChangeHiddingStatus,
                             handleClearSorting,
                             showPopover,
                             setShowPopover

                         }: NoFoundProductsProps) => {
    const categoriesList = useSelector(selectCategoriesItems);
    const { openAddProductModal } = useAddProductModal();

    // if (products.length > 0) return null;

    const allCategoryId = ALL_CATEGORY_OBJECT.id;
    const handleShowAddProductModal = () => {
        const categoryId = activeCategoryId !== allCategoryId ? activeCategoryId : undefined;
        openAddProductModal(categoryId);
    };

    const categoryName = useMemo(() => (
        getCategoryNameById(categoriesList, activeCategoryId) || ALL_CATEGORY_OBJECT.name
    ), [categoriesList, activeCategoryId]);

    const handleShowClearCategoryModal = () => {

    }

    return (
        <>
            <article className="mb-2">
                <div className="d-flex gap-2">
                    <div className="flex-grow-1">
                        <CategoryHeader
                            counter={0}

                            activeCategoryId={activeCategoryId}
                            categoryName={categoryName}

                            onCancelEditProduct={onCancelEditProduct ?? (() => {
                            })}
                            onShowAddProductModal={handleShowAddProductModal}
                            onShowClearCategoryModal={handleShowClearCategoryModal}
                        />
                    </div>

                    <ViewToolbar
                        sortField={sortField}
                        sortDirection={sortDirection}
                        hiddenItemsStatus={hiddenItemsStatus}
                        handleSortFieldChange={handleSortFieldChange}
                        handleSortDirectionChange={handleSortDirectionChange}
                        handleChangeHiddingStatus={handleChangeHiddingStatus}
                        handleClearSorting={handleClearSorting}
                        showPopover={showPopover}
                        setShowPopover={setShowPopover}
                    />
                </div>

                <p>No products found</p>
                <Button variant="dark" onClick={handleShowAddProductModal}>Add first product</Button>
            </article>
        </>
    );
}

export default NoFoundProducts;