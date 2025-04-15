import { useCallback, useEffect, useMemo, useState } from "react";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductItems,
    addProduct, editProduct, deleteProduct, togglePurchased
} from '@store/productListSlice';

// components
import { Button } from "react-bootstrap";
import AddProductModal from "../AddProductModal/AddProductModal";
import GroupedProductList from "../GroupedProductList";

// styles
import styles from "./MainContent.module.css";

// helpers
import { groupProductsByCategory } from "@helpers/groupProductsByCategory";

// interfaces
import { ALL_CATEGORY_NAME } from "@constants/categories";

// interfaces
import { Product } from "../../types/types";
import NoFoundProducts from "../NoFoundProducts/NoFoundProducts";
import { PlusIcon } from "../Icons/PlusIcon";
import { selectActiveCategory, selectCategoriesItems } from "../../store/categoriesSlice";


const MainContent = () => {
    const dispatch = useDispatch();
    // const defaultCategories = getCategories();
    const productList = useSelector(selectProductItems);
    const activeCategory = useSelector(selectActiveCategory);
    const categoriesList = useSelector(selectCategoriesItems);

    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [currentCategory, setCurrentCategory] = useState<string>();

    const filteredProducts = useMemo(() => {
        return activeCategory === ALL_CATEGORY_NAME
            ? productList
            : productList.filter((product: Product) => product.category === activeCategory);
    }, [activeCategory, productList]);

    const groupedProducts = useMemo(() => {
        return groupProductsByCategory(filteredProducts);
    }, [filteredProducts]);

    const openAddModal = useCallback((category?: string) => {
        setIsShowAddModal(true);
        setCurrentCategory(category);
        handleCancelEditProduct();
    }, []);

    const closeAddModal = () => {
        setIsShowAddModal(false);
    };

    useEffect(() => {
        setEditingProductId(null);
    }, [activeCategory]);


    // CRUD
    const handleAddProduct = useCallback((newProduct: Product) => {
        dispatch(addProduct(newProduct));
        setIsShowAddModal(false);
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

    const handleCancelEditProduct = useCallback(() => {
        setEditingProductId(null);
    }, []);

    const handleSaveProductAfterEdit = useCallback((product: Product) => {
        dispatch(editProduct(product));
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
                        activeCategory={activeCategory}
                        onAddProduct={openAddModal}
                    />

                    {filteredProducts.length > 0 && (
                        <>
                            {activeCategory === ALL_CATEGORY_NAME && (
                                <header className="d-flex gap-3 align-items-center mb-4">
                                    <h3 className="h5 mb-0" id="my-list-title">My List</h3>
                                    <Button variant="light" size="sm" onClick={() => openAddModal()}>
                                        <PlusIcon/>
                                        Add product
                                    </Button>
                                </header>
                            )}

                            <GroupedProductList
                                groupedProducts={groupedProducts}
                                editingProductId={editingProductId}
                                categoriesList={categoriesList}
                                activeCategory={activeCategory}
                                onAddProduct={openAddModal}
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

            <AddProductModal
                categoriesList={categoriesList}
                currentCategory={currentCategory}
                isShowModal={isShowAddModal}
                onCloseModal={closeAddModal}
                onAddProduct={handleAddProduct}
            />
        </>
    )
}

export default MainContent;