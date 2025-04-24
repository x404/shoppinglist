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
    handleRenameCategory: () => void;
    handleSelectCategory: (event: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => void;
}


const CategoryView = ({
                          count,
                          isActive,
                          categoryId,
                          categoryName,
                          isHovered,
                          handleOpenAddProductModal,
                          handleOpenAddCategoryModal,
                          handleRenameCategory,
                          handleSelectCategory
                      }: CategoryViewProps) => {
    const allCategory = ALL_CATEGORY_OBJECT.name;
    const allCategoryHighlightClass = categoryName === allCategory ? 'fw-bold text-uppercase' : '';

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
                className={`${styles.counter} ${isHovered ? 'd-none' : 'd-flex'} align-items-center justify-content-center p-1`}
                aria-label={`${count} items`}
            >
                {count}
            </div>
            {categoryName !== allCategory && (
                <CategoryActionsDropdown
                    isVisible={isHovered}
                    onOpenAddProductModal={handleOpenAddProductModal}
                    onOpenAddCategoryModal={handleOpenAddCategoryModal}
                    onRenameCategory={handleRenameCategory}
                />
            )}
        </>
    );
};

export default CategoryView;