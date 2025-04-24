import { useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// context
import { AddProductModalProvider, useAddProductModal } from "./context/AddProductModalContext";

// redux 
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, selectCategoriesItems } from "./store/categoriesSlice";


// components
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import SkipLink from "./components/SkipLink/SkipLink";
import AppHeader from "./components/AppHeader/AppHeader";
import GlobalTooltips from "./components/GlobalTooltips/GlobalTooltips";
import AddProductModal from "./components/AddProductModal/AddProductModal";


// interfaces
import { Category, Product } from "./types/types";
import { AddCategoryModalProvider, useAddCategoryModal } from "./context/AddCategoryModalContext";
import AddCatalogModal from "./components/AddCategoryModal/AddCategoryModal";


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
        dispatch(addCategory(product));
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
        currentCategoryId,
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
            currentCategoryId={currentCategoryId}
            isShowModal={isAddCategoryModalOpen}
            onCloseModal={closeAddCategoryModal}
            onAddCategory={handleAddCategory}
        />
    );
}

function App() {
    return (
        <AddProductModalProvider>
            <AddCategoryModalProvider>
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
                </>
            </AddCategoryModalProvider>
        </AddProductModalProvider>
    )
}

export default App
