import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { Badge, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

// services
import { LocalStorageService } from "@services/LocalStorageService";

// context
import { useAddProductModal } from "@context/AddProductModalContext";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductItems,
    editProduct,
    deleteProduct,
    togglePurchased
} from '@store/productListSlice';
import { selectActiveCategoryId } from "@store/categoriesSlice";

// components
import GroupedProductList from "../GroupedProductList/GroupedProductList";
import NoFoundProducts from "../NoFoundProducts/NoFoundProducts";
import SearchBar from "../SearchBar/SearchBar";
import ViewToolbar from "../ViewToolbar/ViewToolbar";

// styles
import styles from "./MainContent.module.css";

// helpers
import { groupProductsByCategoryId } from "@helpers/groupProductsByCategoryId";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// interfaces
import { Product } from "@/types/types";
import { getCategoryNameById } from "@helpers/getCategoryNameById";
import { selectCategoriesItems } from "@store/categoriesSlice";
import { getProductCountByCategoryId } from "../../helpers/categoryCountsHelpers";


const MainContent = () => {
    const dispatch = useDispatch();
    const { openAddProductModal } = useAddProductModal();

    const productList = useSelector(selectProductItems);
    const activeCategoryId = useSelector(selectActiveCategoryId);
    const categoriesList = useSelector(selectCategoriesItems);

    const [editingProductId, setEditingProductId] = useState<string | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>('');
    const [debouncedSearchText] = useDebounce(searchText, 300);
    const [showPopover, setShowPopover] = useState<boolean>(false);

    const storedSort = LocalStorageService.get<{ sortField: string; sortDirection: string }>('sort') || {
        sortField: '',
        sortDirection: ''
    };
    const [sortField, setSortField] = useState<string>(storedSort.sortField);
    const [sortDirection, setSortDirection] = useState<string>(storedSort.sortDirection);


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
        setSortField(value !== '' ? value : '')
    };

    const handleSortDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortDirection(e.target.value);
    };

    const handleChangeHiddingStatus = (e: ChangeEvent<HTMLInputElement>) => {
        // setSortDirection(e.target.value);
        console.log(e.target.checked);
    };

    const handleClearSorting = () => {
        if (sortField !== '' || sortDirection !== '') {
            setSortField('');
            setSortDirection('');
        }
    };

    useEffect(() => {
        LocalStorageService.set('sort', { sortField, sortDirection });
    }, [sortField, sortDirection]);

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
                            <header
                                className="d-sm-flex flex-sm-wrap gap-3 align-items-center justify-content-between mb-4">
                                {activeCategoryId === ALL_CATEGORY_OBJECT.id && (
                                    <div className="d-flex align-items-center flex-grow-1">
                                        <h3 className="h5 mb-0 me-2" id="my-list-title">My List</h3>
                                        <Button variant="light" size="sm" onClick={() => openAddProductModal()}>
                                            <Plus size={16}/>
                                            <span className="text-nowrap">Add product</span>
                                        </Button>
                                    </div>
                                )}

                                {activeCategoryId !== ALL_CATEGORY_OBJECT.id && (
                                    <>
                                        <div
                                            className={`d-flex align-items-center justify-content-between gap-2 mb-4'}`}>
                                            <div className="d-flex align-items-center flex-grow-1">
                                                <h4 className="mb-0 h5 fw-normal me-1">
                                                    {getCategoryNameById(categoriesList, activeCategoryId)}
                                                </h4>
                                                <Badge
                                                    bg="secondary">{getProductCountByCategoryId(productList, activeCategoryId)}</Badge>
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    onClick={() => openAddProductModal(activeCategoryId)}
                                                    className="ms-2"
                                                >
                                                    <Plus size={16}/>
                                                    Add product
                                                </Button>

                                            </div>
                                        </div>
                                    </>
                                )}


                                <div className='mt-2 mt-sm-0 d-flex gap-2'>
                                    <SearchBar onSearch={setSearchText} initialValue={searchText}/>
                                    <ViewToolbar
                                        sortField={sortField}
                                        sortDirection={sortDirection}
                                        handleSortFieldChange={handleSortFieldChange}
                                        handleSortDirectionChange={handleSortDirectionChange}
                                        handleChangeHiddingStatus={handleChangeHiddingStatus}
                                        handleClearSorting={handleClearSorting}
                                        showPopover={showPopover}
                                        setShowPopover={setShowPopover}
                                    />
                                </div>
                            </header>

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