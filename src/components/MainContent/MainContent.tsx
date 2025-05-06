import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";


import { useAddProductModal } from "@context/AddProductModalContext";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductItems, editProduct, deleteProduct, togglePurchased
} from '@store/productListSlice';
import { selectActiveCategoryId } from "@store/categoriesSlice";


// components
import GroupedProductList from "../GroupedProductList";
import NoFoundProducts from "../NoFoundProducts/NoFoundProducts";
import SearchBar from "../SearchBar/SearchBar";

// styles
import styles from "./MainContent.module.css";

// helpers
import { groupProductsByCategoryId } from "@helpers/groupProductsByCategoryId";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// interfaces
import { Product } from "@/types/types";


const MainContent = () => {
    const dispatch = useDispatch();
    const { openAddProductModal } = useAddProductModal();

    const productList = useSelector(selectProductItems);
    const activeCategoryId = useSelector(selectActiveCategoryId);
    // const categoriesList = useSelector(selectCategoriesItems);

    const [editingProductId, setEditingProductId] = useState<string | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>('');
    const [debouncedSearchText] = useDebounce(searchText, 300);


    // const filteredProducts = useMemo(() => {
    //     return activeCategoryId === ALL_CATEGORY_OBJECT.id
    //         ? productList
    //         : productList.filter((product: Product) => product.categoryId === activeCategoryId);
    // }, [activeCategoryId, productList]);


    const filteredProducts = useMemo(() => {
        const byCategory = activeCategoryId === ALL_CATEGORY_OBJECT.id
            ? productList
            : productList.filter((product: Product) => product.categoryId === activeCategoryId);

        const normalizedSearch = debouncedSearchText.trim().toLowerCase();
        return normalizedSearch.length === 0
            ? byCategory
            : byCategory.filter((product: Product) =>
                product.name.toLowerCase().includes(normalizedSearch)
            );
    }, [activeCategoryId, productList, debouncedSearchText]);


    const groupedProducts = useMemo(() => {
        return groupProductsByCategoryId(filteredProducts);
    }, [filteredProducts]);

    // useEffect(() => {
    //     setEditingProductId(undefined);
    // }, [activeCategoryId]);


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
        setEditingProductId(undefined);
    };


    return (
        <>
            <main className={`${styles.main} py-3 px-3 px-md-0`} id="main">
                <h2 className="h4 fw-bold">Grocery Lists</h2>
                <section className="bg-white shadow-sm p-3 p-md-4 mt-4 shadow-sm" aria-labelledby="my-list-title">

                    {filteredProducts.length === 0 && searchText.length === 0 && (
                        <>
                            <NoFoundProducts
                                products={filteredProducts}
                                activeCategoryId={activeCategoryId}
                            />
                        </>
                    )}


                    {(filteredProducts.length > 0 || searchText.length > 0) && (
                        <>
                            {activeCategoryId === ALL_CATEGORY_OBJECT.id && (
                                <header className="d-flex gap-3 align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center flex-grow-1">
                                        <h3 className="h5 mb-0 me-2" id="my-list-title">My List</h3>
                                        <Button variant="light" size="sm" onClick={() => handleAddProduct()}>
                                            <Plus size={16}/>
                                            Add product
                                        </Button>
                                    </div>
                                    <div>
                                        <SearchBar onSearch={setSearchText} initialValue={searchText}/>
                                    </div>
                                </header>
                            )}

                            {searchText.length > 0 && filteredProducts.length === 0 && (
                                <p className="text-muted mt-3">No products found for "<strong>{searchText}</strong>"</p>
                            )}

                            <GroupedProductList
                                groupedProducts={groupedProducts}
                                editingProductId={editingProductId}
                                activeCategoryId={activeCategoryId}
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