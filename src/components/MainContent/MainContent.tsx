import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

import { useModal } from "@context/ModalContext";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductItems, editProduct, deleteProduct, togglePurchased
} from '@store/productListSlice';
import { selectActiveCategory, selectCategoriesItems } from "@store/categoriesSlice";


// components
import AddProductModal from "../AddProductModal/AddProductModal";
import GroupedProductList from "../GroupedProductList";
import NoFoundProducts from "../NoFoundProducts/NoFoundProducts";

// styles
import styles from "./MainContent.module.css";

// helpers
import { groupProductsByCategory } from "@helpers/groupProductsByCategory";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// interfaces
import { Product } from "../../types/types";


const MainContent = () => {
    const dispatch = useDispatch();
    const { openAddProductModal } = useModal();

    const productList = useSelector(selectProductItems);
    const activeCategoryId = useSelector(selectActiveCategory);
    const categoriesList = useSelector(selectCategoriesItems);

    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    console.log('activeCategoryId', activeCategoryId);
    const filteredProducts = useMemo(() => {
        return activeCategoryId === ALL_CATEGORY_OBJECT.id
            ? productList
            : productList.filter((product: Product) => product.categoryId === activeCategoryId);
    }, [activeCategoryId, productList]);

    const groupedProducts = useMemo(() => {
        return groupProductsByCategory(filteredProducts);
    }, [filteredProducts]);

    useEffect(() => {
        setEditingProductId(null);
    }, [activeCategoryId]);


    // CRUD
    const handleAddProduct = useCallback(() => {
        resetStates();
        openAddProductModal();
    }, []);

    const handleEditProduct = useCallback((productId: string) => {
        setEditingProductId(productId);
    }, []);

    const handleDeleteProduct = useCallback((productId: string) => {
        dispatch(deleteProduct(productId));
    }, []);

    const handleTogglePurchased = useCallback((productId: string) => {
        dispatch(togglePurchased(productId));
    }, []);


    const handleSaveProductAfterEdit = useCallback((product: Product) => {
        dispatch(editProduct(product));
        resetStates();
    }, []);

    const handleCancelEditProduct = useCallback(() => {
        resetStates();
    }, []);

    const resetStates = () => {
        setEditingProductId(null);
    };


    return (
        <>
            <main className={`${styles.main} p-3`} id="main">
                <h2 className="h4 fw-bold">Grocery Lists</h2>
                <section className="bg-white shadow-sm p-3 p-md-4 mt-4 shadow-sm" aria-labelledby="my-list-title">
                    <NoFoundProducts
                        products={filteredProducts}
                        activeCategory={activeCategoryId}
                    />

                    {filteredProducts.length > 0 && (
                        <>
                            {activeCategoryId === ALL_CATEGORY_OBJECT.id && (
                                <header className="d-flex gap-3 align-items-center mb-4">
                                    <h3 className="h5 mb-0" id="my-list-title">My List</h3>
                                    <Button variant="light" size="sm" onClick={() => handleAddProduct()}>
                                        <Plus size={16}/>
                                        Add product
                                    </Button>
                                </header>
                            )}

                            <GroupedProductList
                                groupedProducts={groupedProducts}
                                editingProductId={editingProductId}
                                categoriesList={categoriesList}
                                activeCategory={activeCategoryId}
                                onEditProduct={handleEditProduct}
                                onDeleteProduct={handleDeleteProduct}
                                onTogglePurchasedProduct={handleTogglePurchased}
                                onCancelEditProduct={handleCancelEditProduct}
                                onSaveEditProduct={handleSaveProductAfterEdit}
                            />
                        </>
                    )}
                </section>
            </main>
        </>
    )
}

export default MainContent;