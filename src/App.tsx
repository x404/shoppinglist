import { useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// context
import { AddProductModalProvider, useAddProductModal } from "@context/AddProductModalContext";
import { AddCategoryModalProvider, useAddCategoryModal } from "@context/AddCategoryModalContext";
import { ClearCategoryModalProvider, useClearCategoryModal } from "@context/ClearCategoryModalContext";

// redux 
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from "@store/productListSlice";
import { addCategory, selectCategoriesItems } from "@store/categoriesSlice";

// components
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import SkipLink from "./components/SkipLink/SkipLink";
import AppHeader from "./components/AppHeader/AppHeader";
import GlobalTooltips from "./components/GlobalTooltips/GlobalTooltips";
import AddProductModal from "./components/AddProductModal/AddProductModal";
import AddCatalogModal from "./components/AddCategoryModal/AddCategoryModal";


// interfaces
import { Category, Product } from "./types/types";
import { ClearCategoryModal } from "./components/ClearCategoryModal/ClearCategoryModal";
import { getCategoryNameById } from "./helpers/getCategoryNameById";
import { clearProductsInCategory } from "./store/productListSlice";
import { focusElementByHref } from "./helpers/focusElementByHref";


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

const AddCategoryModalManager = () => {
    const dispatch = useDispatch();
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
            parentCategoryId={parentCategoryId}
            isShowModal={isAddCategoryModalOpen}
            onCloseModal={closeAddCategoryModal}
            onAddCategory={handleAddCategory}
        />
    );
}

const ClearCategoryModalManager = () => {
    const dispatch = useDispatch();
    const categoriesList = useSelector(selectCategoriesItems);
    
    const {
        isClearCategoryModalOpen,
        clearCategoryId,
        closeClearCategoryModal
    } = useClearCategoryModal();

    const handleConfirmClearCategory = useCallback((categoryId: string) => {
        dispatch(clearProductsInCategory(categoryId));
        focusElementByHref(categoryId);
        closeClearCategoryModal();
    }, []);
    
    const categoryName = getCategoryNameById(categoriesList, clearCategoryId);
    const category = {clearCategoryId, categoryName};
    
    return (
        <ClearCategoryModal
            category={category}
            isShowModal={isClearCategoryModalOpen} 
            onConfirmClearCategoryModal={handleConfirmClearCategory}
            onCloseModal={closeClearCategoryModal}
        />
    );
}


function App() {
    return (
        <AddProductModalProvider>
            <AddCategoryModalProvider>
                <ClearCategoryModalProvider>
                    <>
                        <SkipLink/>
                        <div className="d-md-grid wrapper min-vh-100">
                            <AppHeader/>
                            <Sidebar/>
                            <MainContent/>
                        </div>

                        <GlobalTooltips/>
                        <AddProductModalManager/>
                        <AddCategoryModalManager/>
                        <ClearCategoryModalManager/>
                    </>
                </ClearCategoryModalProvider>
            </AddCategoryModalProvider>
        </AddProductModalProvider>
    )
}

export default App
