import { memo, useState } from "react";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductItems,
    selectActiveCategory,
    addProduct, editProduct, deleteProduct, togglePurchased, updateCategoriesItems
} from '../../store/productListSlice';

// components
import { Button } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import ProductItem from "../ProductItem/ProductItem";
import AddProductModal from "../AddProductModal/AddProductModal";

// styles
import styles from "./MainContent.module.css";

// helpers
import { getCategories } from "../helpers/getCategories";
import { groupProductsByCategory } from "../helpers/groupProductsByCategory";


// interfaces
import { Product } from "../../types/types";
import NoFoundProducts from "../NoFoundProducts/NoFoundProducts";

interface CategoryHeader {
    category: string;
    counter: number;
    activeCategory: string;
    onAddProduct: (category: string) => void;
}


const ALL_CATEGORY_NAME = 'All';

const CategoryHeader = memo(({ category, counter, activeCategory, onAddProduct }: CategoryHeader) => {
        const isAllCategory = activeCategory === ALL_CATEGORY_NAME;
        return (
            <h4 className={`d-flex align-items-center gap-2 ${isAllCategory ? 'h6 text-uppercase' : 'h5 mb-4 fw-normal'}`}>
                <div className={`${isAllCategory ? 'fw-bold' : ''}`}>{category}</div>
                <span className="item-title-counter small">{counter}</span>
                <Button
                    variant="light"
                    size="sm"
                    onClick={() => onAddProduct(category)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         aria-hidden="true"
                         width="16"
                         height="16"
                         fill="currentColor"
                         className="bi bi-plus"
                         viewBox="0 0 16 16"
                    >
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    Add product
                </Button>
            </h4>
        )
    }
);


const MainContent = () => {
    const dispatch = useDispatch();
    const defaultCategories = getCategories();

    const productList = useSelector(selectProductItems);
    const activeCategory = useSelector(selectActiveCategory);

    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [editingProductId, setEditingProductId] = useState<number | undefined>(undefined);
    const [currentCategory, setCurrentCategory] = useState<string>();

    const filteredProducts = activeCategory === ALL_CATEGORY_NAME
        ? productList
        : productList.filter((product: Product) => product.category === activeCategory);

    const groupedProducts = groupProductsByCategory(filteredProducts);

    const onAddProduct = (category?: string) => {
        setIsShowAddModal(true);
        setCurrentCategory(category);
    }

    const onCloseAddModal = () => {
        setIsShowAddModal(false);
    };

    const handleAddProduct = (newProduct: Product) => {
        dispatch(addProduct(newProduct));
        dispatch(updateCategoriesItems());
        setIsShowAddModal(false);
    }

    const onEditProduct = (productId: number) => {
        setEditingProductId(productId);
    }

    const handlerDeleteProduct = (productId: number) => {
        dispatch(deleteProduct(productId));
        dispatch(updateCategoriesItems());
    }

    const handlerTogglePurchased = (productId: number) => {
        dispatch(togglePurchased(productId));
    }

    const onCancelEditProduct = () => {
        resetStates();
    }

    // const categoriesList = useSelector(selectCategoriesItems);

    const handlerSaveProductAfterEdit = (product: Product) => {
        dispatch(editProduct(product));
        dispatch(updateCategoriesItems());
        resetStates();
    }

    const resetStates = () => {
        setEditingProductId(-1);
    }

    return (
        <>
            <NoFoundProducts 
                products={filteredProducts} 
                onAddProduct={onAddProduct}
            />

            {filteredProducts.length > 0 && (
                <main className={`${styles.main} p-3`} id="main">
                    <h2 className="h4 fw-bold">Grocery Lists</h2>
                    <section className="bg-white shadow-sm p-4 mt-4 shadow-sm" aria-labelledby="my-list-title">

                        {activeCategory === ALL_CATEGORY_NAME && (
                            <header className="d-flex gap-3 align-items-center mb-4">
                                <h3 className="h5 mb-0" id="my-list-title">My List</h3>
                                <Button
                                    variant="light"
                                    size="sm"
                                    onClick={() => onAddProduct()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16"
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
                            <article className="mb-4" key={category}>
                                <CategoryHeader
                                    category={category}
                                    counter={products.length}
                                    activeCategory={activeCategory}
                                    onAddProduct={onAddProduct}
                                />

                                <ul className="list-group mt-2" aria-label={category}>
                                    {products.map((product) => (
                                        <ProductItem
                                            key={product.id}
                                            product={product}
                                            editingProductId={editingProductId}
                                            onEmitEditProduct={onEditProduct}
                                            onEmitDeleteProduct={handlerDeleteProduct}
                                            onEmitTogglePurchasedProduct={handlerTogglePurchased}
                                            onCancelEditProduct={onCancelEditProduct}
                                            categoriesList={defaultCategories}
                                            onSaveEditProduct={handlerSaveProductAfterEdit}
                                        />
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </section>
                </main>
            )}
            
            <AddProductModal
                categoriesList={defaultCategories}
                currentCategory={currentCategory}
                isShowModal={isShowAddModal}
                onCloseModal={onCloseAddModal}
                handleAddProduct={handleAddProduct}
            />

            <Tooltip id="edit-tooltip"/>
            <Tooltip
                id="delete-tooltip"
                place="top"
                arrowColor="var(--bs-red)"
                className="delete-tooltip"
            />
        </>
    )
}

export default MainContent;