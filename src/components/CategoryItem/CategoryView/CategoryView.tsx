import { MouseEvent } from "react";
import CategoryActionsDropdown from "../../CategoryActionsDropdown/CategoryActionsDropdown";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// styles
import styles from "./CategoryView.module.css";

// interfaces
interface CategoryViewProps {
    count: number;
    isActive: boolean;
    categoryId: string;
    categoryName: string;
    isHovered: boolean;
    handleOpenAddProductModal: () => void;
    handleOpenAddCategoryModal: () => void;
    handleOpenDeleteCategoryModal: () => void;
    handleSelectCategory: (event: MouseEvent<HTMLElement>, categoryId: string) => void;
    handleRenameCategory: () => void;
    handleClearCategory: () => void;
}


const CategoryView = ({
                          count,
                          isActive,
                          categoryId,
                          categoryName,
                          isHovered,
                          handleOpenAddProductModal,
                          handleOpenAddCategoryModal,
                          handleOpenDeleteCategoryModal,
                          handleRenameCategory,
                          handleClearCategory,
                          handleSelectCategory
                      }: CategoryViewProps) => {
    const isAllCategory = categoryId === ALL_CATEGORY_OBJECT.id;
    const allCategoryHighlightClass = isAllCategory ? 'fw-bold text-uppercase' : '';

    return (
        <>
            <a href={`#${categoryId}`}
               className={`${styles.sidebarLink} flex-grow-1 ps-2 ${allCategoryHighlightClass}`}
               {...(isActive ? { 'aria-current': 'page' } : {})}
               title=""
               onClick={(event) => handleSelectCategory(event, categoryId)}
            >
                {categoryName}
            </a>
            <div
                className={`${styles.counter} ${isHovered && !isAllCategory ? 'd-none' : 'd-flex'} align-items-center justify-content-center p-1`}
                aria-label={`${count} items`}
            >
                {count}
            </div>
            {!isAllCategory && (
                <CategoryActionsDropdown
                    isVisible={isHovered}
                    count={count}
                    onOpenAddProductModal={handleOpenAddProductModal}
                    onOpenAddCategoryModal={handleOpenAddCategoryModal}
                    onOpenDeleteCategoryModal={handleOpenDeleteCategoryModal}
                    onRenameCategory={handleRenameCategory}
                    onClearCategory={handleClearCategory}
                />
            )}
        </>
    );
};

export default CategoryView;