import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

// redux
import { selectCategoriesItems } from "@store/categoriesSlice";
import { deleteProductsInCategory, selectProductItems } from "@store/productListSlice";

// context
import { useClearCategoryModal } from "@context/ClearCategoryModalContext";

// helpers
import { focusElementByHref } from "@helpers/focusElementByHref";
import { getCategoryNameById } from "@helpers/getCategoryNameById";
import { getProductCountByCategoryId } from "@helpers/categoryCountsHelpers";

// components
import { ClearCategoryModal } from "../ClearCategoryModal/ClearCategoryModal";

const ClearCategoryModalManager = () => {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductItems);
    const categoriesList = useSelector(selectCategoriesItems);

    const {
        isClearCategoryModalOpen,
        clearCategoryId,
        closeClearCategoryModal
    } = useClearCategoryModal();

    const handleConfirmClearCategory = useCallback((categoryId: string) => {
        const categoryIdsToClear = [categoryId];
        dispatch(deleteProductsInCategory(categoryIdsToClear));
        focusElementByHref(categoryId);
        closeClearCategoryModal();
    }, [dispatch, closeClearCategoryModal]);

    const categoryName = getCategoryNameById(categoriesList, clearCategoryId);
    const count = getProductCountByCategoryId(productList, clearCategoryId)
    const category = { clearCategoryId, categoryName, count };

    return (
        <ClearCategoryModal
            count={count}
            category={category}
            isShowModal={isClearCategoryModalOpen}
            onConfirmClearCategoryModal={handleConfirmClearCategory}
            onCloseModal={closeClearCategoryModal}
        />
    );
}

export default ClearCategoryModalManager;