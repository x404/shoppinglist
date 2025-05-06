import { MouseEvent, useCallback, useMemo, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FileEarmarkPlus, FolderPlus, LayoutSidebar, Plus } from "react-bootstrap-icons";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectProductItems } from '@store/productListSlice';
import { selectActiveCategoryId, selectCategoriesItems, setActiveCategory, editCategory } from "@store/categoriesSlice";

import { useAddProductModal } from "@context/AddProductModalContext";
import { useAddCategoryModal } from "@context/AddCategoryModalContext";
import { useClearCategoryModal } from "@context/ClearCategoryModalContext";
import { useDeleteCategoryModal } from "@context/DeleteCategoryModalContext";

// components
import CategoryItem from "../CategoryItem/CategoryItem";

// styles
import styles from "./Sidebar.module.css";

// interfaces
import { Category } from "@/types/types";


const Sidebar = () => {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductItems);
    const categoriesList = useSelector(selectCategoriesItems);

    const activeCategoryId = useSelector(selectActiveCategoryId);
    const categories = [ALL_CATEGORY_OBJECT, ...categoriesList];

    const [editingCategoryId, setEditingCategoryId] = useState<string | undefined>(undefined);

    const { openClearCategoryModal } = useClearCategoryModal();
    const { openDeleteCategoryModal } = useDeleteCategoryModal();

    const getCategoryCountById = (id: string): number => {
        return id === ALL_CATEGORY_OBJECT.id
            ? productList.length
            : productList.filter(product => product.categoryId === id).length;
    };


    const categoryCounts = useMemo(() => {
        const counts: { [key: string]: number } = {};
        categories.forEach(category => {
            counts[category.id] = getCategoryCountById(category.id);
        });

        return counts;
    }, [productList, categoriesList]);


    const requestSelectCategory = (event: MouseEvent<HTMLElement>, categoryId: string) => {
        event.preventDefault();
        dispatch(setActiveCategory(categoryId));
    }

    const { openAddProductModal } = useAddProductModal();
    const { openAddCategoryModal } = useAddCategoryModal();

    const requestOpenAddProductModal = (categoryId?: string) => {
        const id = categoryId ? categoryId : undefined;
        openAddProductModal(id)
    }

    const requestOpenAddCategoryModal = (categoryId?: string) => {
        const id = categoryId ? categoryId : undefined;
        openAddCategoryModal(id)
    }

    const requestRenameCategory = (categoryId?: string) => {
        setEditingCategoryId(categoryId);
    }

    const requestClearCategory = (categoryId: string) => {
        openClearCategoryModal(categoryId);
    }


    const requestOpenDeleteCategoryModal = (categoryId: string) => {
        console.log('categoryId delete', categoryId);
        openDeleteCategoryModal(categoryId);
    }

    const handleSaveEditCategory = useCallback((category: Category) => {
        dispatch(editCategory(category));
        resetStates();
    }, []);

    const requestCancelEditCategory = () => {
        resetStates();
    }

    const resetStates = () => {
        setEditingCategoryId(undefined);
    };

    return (
        <>
            <aside aria-label="Sidebar navigation" className={`${styles.sidebar} p-3 pt-1 z-1`}>
                <nav>
                    <div className={`${styles.sidebarRow} d-flex justify-content-between align-items-center px-2`}>
                        <h2 className="h6 mb-0 py-2">Categories space</h2>
                        <div className={`${styles.actions}`}>
                            <Dropdown drop="end">
                                <Dropdown.Toggle
                                    as="button"
                                    className={`${styles.addBtn} ${styles.noRightArrow} btn d-flex align-items-center p-0`}
                                    size="sm"
                                    variant=""
                                    data-tooltip-id="custom-tooltip"
                                    data-tooltip-content="Create category, add product, etc."
                                    data-tooltip-place="top"
                                >
                                    <Plus size={20}/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        as="button"
                                        onClick={() => requestOpenAddCategoryModal()}
                                    >
                                        <div className="d-flex">
                                            <div className={`${styles.icon} me-2`}>
                                                <FolderPlus size={16}/>
                                            </div>
                                            <div className="title flex-grow-1">
                                                Category
                                            </div>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item as="button" className=""
                                                   onClick={() => requestOpenAddProductModal()}>
                                        <div className="d-flex">
                                            <div className={`${styles.icon} me-2`}>
                                                <FileEarmarkPlus size={16}/>
                                            </div>
                                            <div className="title flex-grow-1">
                                                Product
                                            </div>
                                        </div>
                                    </Dropdown.Item>
                                    {/*<Dropdown.Divider/>*/}
                                    {/*<Dropdown.Item as="button">Something else</Dropdown.Item>*/}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <ul className="list-unstyled menu mb-0">
                        {categories.map((category) => (
                            <CategoryItem
                                key={category.id}
                                category={category}
                                count={categoryCounts[category.id]}
                                isActive={activeCategoryId === category.id}
                                onSelectCategory={requestSelectCategory}
                                onOpenAddProductModal={requestOpenAddProductModal}
                                onOpenAddCategoryModal={requestOpenAddCategoryModal}
                                onOpenDeleteCategoryModal={requestOpenDeleteCategoryModal}
                                onRenameCategory={requestRenameCategory}
                                onClearCategory={requestClearCategory}
                                onSaveEditCategory={handleSaveEditCategory}
                                isEditingCategory={editingCategoryId === category.id}
                                onCancelEditCategory={requestCancelEditCategory}
                            />
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    )
}


export default Sidebar;