import { MouseEvent } from "react";

import styles from './CategoryItem.module.css';

interface CategoryItem {
    category: string;
    count: number;
    isActive: boolean;
    onSelectCategory: (event: MouseEvent<HTMLAnchorElement>, category: string) => void;
    allCategory: string;
}


const CategoryItem = ({ category, count, isActive, onSelectCategory, allCategory }: CategoryItem) => {
    const activeClass = isActive ? styles.active : '';
    const allCategoryClass = category === allCategory ? 'fw-bold text-uppercase' : '';

    return (
        <>
            <li className={`${styles.menuItem} d-flex align-items-center mt-1 ps-2 pe-2 ${activeClass}`}>
                <a href={`#${category}`}
                   className={`${styles.sidebarLink} flex-grow-1 ps-2 ${allCategoryClass}`}
                   {...(isActive ? { 'aria-current': 'page' } : {})}
                   title=""
                   onClick={(event) => onSelectCategory(event, category)}
                >
                    {category}
                </a>
                <div
                    className={`${styles.counter} d-flex align-items-center justify-content-center p-1`}
                    aria-label={`${count} items`}
                >
                    {count}
                </div>
            </li>
        </>
    )
};

export default CategoryItem;