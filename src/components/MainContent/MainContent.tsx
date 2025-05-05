import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import { Plus, Trash, X } from "react-bootstrap-icons";

import { useAddProductModal } from "@context/AddProductModalContext";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductItems, editProduct, deleteProduct, togglePurchased
} from '@store/productListSlice';
import { selectActiveCategoryId, selectCategoriesItems } from "@store/categoriesSlice";


// components
import GroupedProductList from "../GroupedProductList";
import NoFoundProducts from "../NoFoundProducts/NoFoundProducts";

// styles
import styles from "./MainContent.module.css";

// helpers
import { groupProductsByCategoryId } from "@helpers/groupProductsByCategoryId";
import { getCategoryNameById } from "@helpers/getCategoryNameById";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// interfaces
import { Product } from "@/types/types";
import { useDebounce } from "use-debounce";


const MainContent = () => {
    const dispatch = useDispatch();
    const { openAddProductModal } = useAddProductModal();

    const productList = useSelector(selectProductItems);
    const activeCategoryId = useSelector(selectActiveCategoryId);
    // const categoriesList = useSelector(selectCategoriesItems);

    const [editingProductId, setEditingProductId] = useState<string | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>('Banana');
    const [debouncedSearchText] = useDebounce(searchText, 300); // Задержка 300 мс


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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        console.log(event)
    }

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    }, []);


    const onClearSearch = () => {
        setSearchText('');
    }


    return (
        <>
            <main className={`${styles.main} py-3 px-3 px-md-0`} id="main">
                <h2 className="h4 fw-bold">Grocery Lists</h2>
                <section className="bg-white shadow-sm p-3 p-md-4 mt-4 shadow-sm" aria-labelledby="my-list-title">

                    {filteredProducts.length === 0 && (
                        <NoFoundProducts
                            products={filteredProducts}
                            activeCategoryId={activeCategoryId}
                        />
                    )}


                    {filteredProducts.length > 0 && (
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

                                        <Form onSubmit={handleSubmit} className="position-relative">
                                            <Form.Group className="">
                                                <Form.Label className="visually-hidden">Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Search..."
                                                    onChange={handleSearchChange}
                                                    value={searchText}
                                                />
                                            </Form.Group>
                                            <Button
                                                variant=""
                                                size="sm"
                                                className={`${styles.clearSearchButton} d-flex align-items-center position-absolute end-0 top-0 rounded-circle p-0`}
                                                onClick={onClearSearch}
                                            >
                                                <X size={24}/>
                                            </Button>
                                        </Form>

                                    </div>
                                </header>
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