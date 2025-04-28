import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

// redux
import { selectCategoriesItems } from "@store/categoriesSlice";
import { addProduct } from "@store/productListSlice";

// context
import { useAddProductModal } from "@context/AddProductModalContext";

// components
import AddProductModal from "../AddProductModal/AddProductModal";

// interfaces
import { Product } from "@/types/types";

const AddProductModalManager = () => {
    const dispatch = useDispatch();
    const categoriesList = useSelector(selectCategoriesItems);
    const {
        isAddProductModalOpen,
        currentCategoryId,
        closeAddProductModal
    } = useAddProductModal();

    // CRUD
    const handleAddProduct = useCallback((product: Product) => {
        dispatch(addProduct(product));
        closeAddProductModal();
    }, []);

    return (
        <AddProductModal
            categoriesList={categoriesList}
            currentCategoryId={currentCategoryId}
            isShowModal={isAddProductModalOpen}
            onCloseModal={closeAddProductModal}
            onAddProduct={handleAddProduct}
        />
    );
}

export default AddProductModalManager;