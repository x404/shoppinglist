import { MouseEvent, useState } from "react";

// redux, context
// import { useModal } from "@context/ModalContext";


// styles
import styles from './CategoryItem.module.css';

// interfaces
import { Category } from "@/types/types";
import CategoryActionsDropdown from "../CategoryActionsDropdown/CategoryActionsDropdown";
interface CategoryItem {
    category: Category;
    count: number;
    isActive: boolean;
    onSelectCategory: (event: MouseEvent<HTMLAnchorElement>, categoryId: string) => void;
    allCategory: string;
    onOpenAddProductModal: (categoryId?: string) => void;
}


const CategoryItem = ({ category, count, isActive, onSelectCategory, allCategory, onOpenAddProductModal }: CategoryItem) => {
    const { id: categoryId, name } = category;
    
    // const { openAddProductModal } = useModal();
    const activeClass = isActive ? styles.active : '';
    const allCategoryHighlightClass = name === allCategory ? 'fw-bold text-uppercase' : '';
    const allCategoryClass = name === allCategory ? styles.menuAllItem : '';

    const [isHovered, setIsHovered] = useState(false);


    const handleOpenAddProductModal = () => {
        onOpenAddProductModal(categoryId);
    }

    const onRenameCategory = () => {
    }
    
    return (
        <>
            <li 
                className={`${styles.menuItem} ${allCategoryClass} d-flex align-items-center mt-1 px-2 position-relative ${activeClass}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <a href={`#${categoryId}`}
                   className={`${styles.sidebarLink} flex-grow-1 ps-2 ${allCategoryHighlightClass}`}
                   {...(isActive ? { 'aria-current': 'page' } : {})}
                   title=""
                   onClick={(event) => onSelectCategory(event, categoryId)}
                >
                    {name}
                </a>
                <div
                    className={`${styles.counter} d-flex align-items-center justify-content-center p-1`}
                    aria-label={`${count} items`}
                >
                    {count}
                </div>
                {name !== allCategory && (
                    <CategoryActionsDropdown 
                        isVisible={isHovered}
                        onOpenAddProductModal={handleOpenAddProductModal}
                        onRenameCategory={onRenameCategory}
                    />
                )}
            </li>
        </>
    )
};

export default CategoryItem;