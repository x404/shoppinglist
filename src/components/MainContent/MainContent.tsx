import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

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
import TopCategoryHeaderBlock from "../TopCategoryHeaderBlock/TopCategoryHeaderBlock";
import TopAllHeaderBlock from "../TopAllHeaderBlock/TopAllHeaderBlock";

// styles
import styles from "./MainContent.module.css";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// interfaces
import { Product } from "@/types/types";
import { selectCategoriesItems } from "@store/categoriesSlice";

// hooks
import { useProcessedProducts } from "@hooks/useProcessedProducts";


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

    const isHiddenItemsStatus = LocalStorageService.get<boolean>('isHiddenItemsStatus');
    const [hiddenItemsStatus, setHiddenItemsStatus] = useState<boolean>(isHiddenItemsStatus || false);

    const storedSort = LocalStorageService.get<{ sortField: string; sortDirection: string }>('sort') || {
        sortField: '',
        sortDirection: ''
    };
    const [sortField, setSortField] = useState<string>(storedSort.sortField);
    const [sortDirection, setSortDirection] = useState<string>(storedSort.sortDirection);

    const { filteredProducts, groupedProducts } = useProcessedProducts({
        productList,
        activeCategoryId,
        debouncedSearchText,
        sortField,
        sortDirection,
        hiddenItemsStatus
    });

    // CRUD
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
        const status = e.target.checked;
        setHiddenItemsStatus(status);
        LocalStorageService.set('isHiddenItemsStatus', status);
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
                        <NoFoundProducts
                            products={filteredProducts}
                            activeCategoryId={activeCategoryId}
                        />
                    )}

                    {(filteredProducts.length > 0 || searchText.length > 0) && (
                        <>
                            <header
                                className="d-sm-flex flex-sm-wrap gap-3 align-items-center justify-content-between mb-4">
                                {activeCategoryId === ALL_CATEGORY_OBJECT.id && (
                                    <TopAllHeaderBlock onAdd={openAddProductModal} />
                                )}

                                {activeCategoryId !== ALL_CATEGORY_OBJECT.id && (
                                    <TopCategoryHeaderBlock
                                        activeCategoryId={activeCategoryId}
                                        categoriesList={categoriesList}
                                        productList={productList}
                                        onAdd={openAddProductModal}
                                    />
                                )}

                                <div className='mt-2 mt-sm-0 d-flex gap-2'>
                                    <SearchBar onSearch={setSearchText} initialValue={searchText}/>
                                    <ViewToolbar
                                        sortField={sortField}
                                        sortDirection={sortDirection}
                                        hiddenItemsStatus={hiddenItemsStatus}
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