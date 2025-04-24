import { useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// context
import { AddProductModalProvider, useModal } from "./context/AddProductModalContext";

// redux 
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoriesItems } from "./store/categoriesSlice";
import { addProduct } from "./store/productListSlice";

// components
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import SkipLink from "./components/SkipLink/SkipLink";
import AppHeader from "./components/AppHeader/AppHeader";
import GlobalTooltips from "./components/GlobalTooltips/GlobalTooltips";
import AddProductModal from "./components/AddProductModal/AddProductModal";


// interfaces
import { Product } from "./types/types";



function ModalManager() {
    const dispatch = useDispatch();
    const categoriesList = useSelector(selectCategoriesItems);
    const {
        isAddProductModalOpen,
        currentCategoryId,
        closeAddProductModal
    } = useModal();

    // CRUD
    const handleAddProduct = useCallback((product: Product) => {
        dispatch(addProduct(product));
        closeAddProductModal();
    }, []);


    // let currentCategoryName = '';
    // if (currentCategoryId){
    //     currentCategoryName = getCategoryNameById(categoriesList, currentCategoryId);
    // }

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

function App() {
    return (
        <AddProductModalProvider>
            <>
                <SkipLink/>
                <div className="d-md-grid wrapper min-vh-100">
                    <AppHeader/>
                    <Sidebar/>
                    <MainContent/>
                </div>

                <GlobalTooltips/>
                <ModalManager/>
            </>
        </AddProductModalProvider>
    )
}

export default App
