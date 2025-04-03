import { memo, useState } from "react";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductItems,
    selectActiveCategory,
    addProduct, editProduct, deleteProduct, togglePurchased, selectCategoriesItems
} from '../../store/productListSlice';

// components
import { Button } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import ProductItem from "../ProductItem/ProductItem";
import AddProductModal from "../AddProductModal/AddProductModal";

// styles
import styles from "./MainContent.module.css";

// helpers
import { groupProductsByCategory } from "../../helpers/groupProductsByCategory";

// interfaces
import { ALL_CATEGORY_NAME } from "../../constants/categories";

// interfaces
import { Product } from "../../types/types";
import NoFoundProducts from "../NoFoundProducts/NoFoundProducts";
import { CategoryHeader } from "../CategoryHeader/CategoryHeader";



const MainContent = () => {
    const dispatch = useDispatch();
    // const defaultCategories = getCategories();

    const productList = useSelector(selectProductItems);
    const activeCategory = useSelector(selectActiveCategory);
    const categoriesList = useSelector(selectCategoriesItems);

    
    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [editingProductId, setEditingProductId] = useState<number | undefined>(undefined);
    const [currentCategory, setCurrentCategory] = useState<string>();

    const filteredProducts = activeCategory === ALL_CATEGORY_NAME
        ? productList
        : productList.filter((product: Product) => product.category === activeCategory);

    const groupedProducts = groupProductsByCategory(filteredProducts);

    const openAddModal = (category?: string) => {
        setIsShowAddModal(true);
        setCurrentCategory(category);
    }

    const closeAddModal = () => {
        setIsShowAddModal(false);
    };

    
    // CRUD
    const handleAddProduct = (newProduct: Product) => {
        dispatch(addProduct(newProduct));
        setIsShowAddModal(false);
    }

    const handleEditProduct = (productId: number) => {
        setEditingProductId(productId);
    }

    const handleDeleteProduct = (productId: number) => {
        dispatch(deleteProduct(productId));
    }

    const handleTogglePurchased = (productId: number) => {
        dispatch(togglePurchased(productId));
    }

    const handleCancelEditProduct = () => {
        resetStates();
    }

    const handleSaveProductAfterEdit = (product: Product) => {
        dispatch(editProduct(product));
        resetStates();
    }

    const resetStates = () => {
        setEditingProductId(-1);
    }

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
                                    <Button
                                        variant="light"
                                        size="sm"
                                        onClick={() => openAddModal()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                             height="16"
                                             fill="currentColor"
                                             className="bi bi-plus" viewBox="0 0 16 16">
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                        </svg>
                                        Add product
                                    </Button>
                                </header>
                            )}

                            {Object.entries(groupedProducts).map(([category, products]) => (
                                <article className="mb-2" key={category}>
                                    <CategoryHeader
                                        category={category}
                                        activeCategory={activeCategory}
                                        counter={products.length}
                                        onAddProduct={openAddModal}
                                    />

                                    <ul className="list-group mt-2" aria-label={category}>
                                        {products.map((product) => (
                                            <ProductItem
                                                key={product.id}
                                                product={product}
                                                editingProductId={editingProductId}
                                                categoriesList={categoriesList}
                                                onEditProduct={handleEditProduct}
                                                onDeleteProduct={handleDeleteProduct}
                                                onTogglePurchasedProduct={handleTogglePurchased}
                                                onCancelEditProduct={handleCancelEditProduct}
                                                onSaveEditProduct={handleSaveProductAfterEdit}
                                            />
                                        ))}
                                    </ul>
                                </article>
                            ))}
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

            <Tooltip id="save-tooltip" place="top" className="saveTooltip"/>
            <Tooltip id="edit-tooltip" place="top"/>
            <Tooltip
                id="delete-tooltip"
                place="top"
                arrowColor="var(--bs-red)"
                className="deleteTooltip"
            />
        </>
    )
}

export default MainContent;