import { MouseEvent, useState } from "react";

// redux, context
import { useModal } from "@context/ModalContext";


// styles
import styles from './CategoryItem.module.css';
import sidebarStyles from './../Sidebar/Sidebar.module.css';

// interfaces
import { Category } from "@/types/types";
import CategoryActionsDropdown from "../CategoryActionsDropdown/CategoryActionsDropdown";
interface CategoryItem {
    category: Category;
    count: number;
    isActive: boolean;
    onSelectCategory: (event: MouseEvent<HTMLAnchorElement>, categoryId: string) => void;
    allCategory: string;
}


const CategoryItem = ({ category, count, isActive, onSelectCategory, allCategory }: CategoryItem) => {
    const { id, name } = category;
    
    const { openAddProductModal } = useModal();
    const activeClass = isActive ? styles.active : '';
    const allCategoryHighlightClass = name === allCategory ? 'fw-bold text-uppercase' : '';
    const allCategoryClass = name === allCategory ? styles.menuAllItem : '';

    const [isHovered, setIsHovered] = useState(false);


    const onOpenAddProductModal = () => {
        openAddProductModal(name);
    }

    return (
        <>
            <li 
                className={`${styles.menuItem} ${allCategoryClass} d-flex align-items-center mt-1 px-2 position-relative ${activeClass}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <a href={`#${id}`}
                   className={`${styles.sidebarLink} flex-grow-1 ps-2 ${allCategoryHighlightClass}`}
                   {...(isActive ? { 'aria-current': 'page' } : {})}
                   title=""
                   onClick={(event) => onSelectCategory(event, id)}
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
                        onOpenAddProductModal={onOpenAddProductModal}
                        isVisible={isHovered}
                    />
                )}
            </li>
        </>
    )
};

export default CategoryItem;