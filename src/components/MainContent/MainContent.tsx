import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { Button, ButtonToolbar, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { Plus, Sliders, Trash } from "react-bootstrap-icons";


import { useAddProductModal } from "@context/AddProductModalContext";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductItems, editProduct, deleteProduct, togglePurchased
} from '@store/productListSlice';
import { selectActiveCategoryId } from "@store/categoriesSlice";


// components
import GroupedProductList from "../GroupedProductList/GroupedProductList";
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
    const [sortField, setSortField] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<string>('');
    const [showPopover, setShowPopover] = useState<boolean>(false);


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


    const sortedProducts = useMemo(() => {
        if (sortField === '' || sortDirection === '') return filteredProducts;

        const sorted = [...filteredProducts];

        sorted.sort((a, b) => {
            let valueA: string | number = '';
            let valueB: string | number = '';

            if (sortField === 'name') {
                valueA = a.name.toLowerCase();
                valueB = b.name.toLowerCase();
            } else if (sortField === 'purchased') {
                valueA = a.purchased ? 1 : 0;
                valueB = b.purchased ? 1 : 0;
            }

            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredProducts, sortField, sortDirection]);

    const groupedProducts = useMemo(() => {
        return groupProductsByCategoryId(sortedProducts);
    }, [sortedProducts]);


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

    const handleSortFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSortField(value === 'none' ? '' : value);
    };

    const handleSortDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortDirection(e.target.value);
    };

    const handleClearSorting = () => {
        if (sortField !== '' || sortDirection !== '') {
            setSortField('');
            setSortDirection('');
        }
    };

    const popoverViewOption = (
        <Popover id="popover-trigger-click-root-close" className={styles.customPopover}>
            <section className="p-2">
                <header>Sorting by</header>

                <div className="d-flex gap-2 mt-2">
                    <Form.Select
                        aria-label="sort by"
                        size="sm"
                        className={styles.sortingSelect}
                        onChange={handleSortFieldChange}
                        value={sortField || 'none'}
                    >
                        <option>Open select menu</option>
                        <option value="purchased">Status</option>
                        <option value="name">Name</option>
                    </Form.Select>

                    <Form.Select
                        aria-label="sorting direction"
                        size="sm"
                        className={styles.sortingSelect}
                        onChange={handleSortDirectionChange}
                        value={sortDirection}
                    >
                        <option>Open select menu</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Form.Select>

                    <Button
                        size="sm"
                        variant=""
                        className={styles.viewBtn}
                        onClick={handleClearSorting}
                        title="Clear sorting"
                    >
                        <Trash size={16}/>
                    </Button>
                </div>
            </section>
        </Popover>
    );


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
                                <header className="d-sm-flex gap-3 align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center flex-grow-1">
                                        <h3 className="h5 mb-0 me-2" id="my-list-title">My List</h3>
                                        <Button variant="light" size="sm" onClick={() => handleAddProduct()}>
                                            <Plus size={16}/>
                                            Add product
                                        </Button>
                                    </div>
                                    <div className='mt-2 mt-sm-0 d-flex gap-2'>
                                        <SearchBar onSearch={setSearchText} initialValue={searchText}/>
                                        <ButtonToolbar>
                                            <OverlayTrigger
                                                trigger="click"
                                                rootClose
                                                placement="bottom"
                                                overlay={popoverViewOption}
                                                onToggle={(next) => setShowPopover(next)}
                                            >
                                                <Button
                                                    variant=""
                                                    className={`${styles.viewBtn} ${(sortField !== '' && sortDirection !== '') ? styles.enabled : ''} ${showPopover ? styles.active : ''}`}
                                                >
                                                    <Sliders width={16} height={16} color="#000" className="me-2"/>
                                                    View
                                                </Button>
                                            </OverlayTrigger>
                                        </ButtonToolbar>
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