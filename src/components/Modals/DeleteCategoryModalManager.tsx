import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

// redux
import { selectCategoriesItems } from "@store/categoriesSlice";
import { deleteProductsInCategory, selectProductItems } from "@store/productListSlice";
import { deleteCategoryById } from "@store/categoriesSlice";
import { selectTreeCategories } from "@store/categoriesSlice";

// context
import { useDeleteCategoryModal } from "@context/DeleteCategoryModalContext";

// helpers
import { getCategoryNameById } from "@helpers/getCategoryNameById";
import { getProductCountByCategoryId } from "@helpers/categoryCountsHelpers";
import { getAllNestedCategoryIds } from "@helpers/categoryTreeHelpers";

// components
import { DeleteCategoryModal } from "../DeleteCategoryModal/DeleteCategoryModal";

const DeleteCategoryModalManager = () => {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductItems);
    const categoriesList = useSelector(selectCategoriesItems);
    const categoriesTree = useSelector(selectTreeCategories);

    const {
        isDeleteCategoryModalOpen,
        deleteCategoryId,
        closeDeleteCategoryModal
    } = useDeleteCategoryModal();

    const handleConfirmDeleteCategory = useCallback((categoryId: string) => {

        const idsToDelete = getAllNestedCategoryIds(categoriesTree, categoryId);

        dispatch(deleteProductsInCategory(idsToDelete));
        dispatch(deleteCategoryById(idsToDelete));
        // focusElementByHref(categoryId);
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