import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

// redux
import { addCategory } from "@store/categoriesSlice";

// context
import { useAddCategoryModal } from "@context/AddCategoryModalContext";

// components
import AddCatalogModal from "../AddCategoryModal/AddCategoryModal";

// interfaces
import { Category } from "@/types/types";
import { selectCategoriesItems, selectTreeCategories } from "../../store/categoriesSlice";


const AddCategoryModalManager = () => {
    const dispatch = useDispatch();
    const categoriesTree = useSelector(selectTreeCategories);
    const categoriesList = useSelector(selectCategoriesItems);
    const {
        isAddCategoryModalOpen,
        parentCategoryId,
        closeAddCategoryModal
    } = useAddCategoryModal();

    // CRUD
    const handleAddCategory = useCallback((catalog: Category) => {
        dispatch(addCategory(catalog));
        closeAddCategoryModal();
    }, []);

    return (
        <AddCatalogModal
            categoriesList={categoriesList}
            categoriesTree={categoriesTree}
            parentCategoryId={parentCategoryId}
            isShowModal={isAddCategoryModalOpen}
            onCloseModal={closeAddCategoryModal}
            onAddCategory={handleAddCategory}
        />
    );
}

export default AddCategoryModalManager;