import { useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// context
import { ModalProvider, useModal } from "./context/ModalContext";

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

// helpers
import { getNamesCategories } from "./helpers/getNamesCategories";
import { getCategoryNameById } from "./helpers/getCategoryNameById";


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

    // console.log(categoriesList)

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
        <ModalProvider>
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
        </ModalProvider>
    )
}

export default App
