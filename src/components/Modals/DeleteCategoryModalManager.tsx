import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

// redux
import { selectCategoriesItems } from "@store/categoriesSlice";
import { clearProductsInCategory, selectProductItems } from "@store/productListSlice";

// context
import { useDeleteCategoryModal } from "@context/DeleteCategoryModalContext";

// helpers
import { focusElementByHref } from "@helpers/focusElementByHref";
import { getCategoryNameById } from "@helpers/getCategoryNameById";
import { getProductCountByCategoryId } from "@helpers/categoryCountsHelpers";

// components
import { DeleteCategoryModal } from "../DeleteCategoryModal/DeleteCategoryModal";

const DeleteCategoryModalManager = () => {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductItems);
    const categoriesList = useSelector(selectCategoriesItems);

    const {
        isDeleteCategoryModalOpen,
        deleteCategoryId,
        closeDeleteCategoryModal
    } = useDeleteCategoryModal();

    const handleConfirmDeleteCategory = useCallback((categoryId: string) => {
        dispatch(clearProductsInCategory(categoryId));
        focusElementByHref(categoryId);
        closeDeleteCategoryModal();
    }, [dispatch, closeDeleteCategoryModal]);

    const categoryName = getCategoryNameById(categoriesList, deleteCategoryId);
    const count = getProductCountByCategoryId(productList, deleteCategoryId)
    const category = { deleteCategoryId, categoryName, count };

    return (
        <DeleteCategoryModal
            count={count}
            category={category}
            isShowModal={isDeleteCategoryModalOpen}
            onConfirmDeleteCategoryModal={handleConfirmDeleteCategory}
            onCloseModal={closeDeleteCategoryModal}
        />
    );
}

export default DeleteCategoryModalManager;