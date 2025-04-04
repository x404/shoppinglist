import styles from './Category.module.css';

interface CategoryItem {
    category: string;
    count: number;
    isActive: boolean;
    onSelectCategory: (event: React.MouseEvent<HTMLAnchorElement>, category: string) => void;
    allCategory: string;
}


const CategoryItem = ({ category, count, isActive, onSelectCategory, allCategory }: CategoryItem) => {
    return (
        <>
            <li className={`${styles['menu-item']} d-flex align-items-center mt-1 ps-2 pe-2 ${isActive ? styles.active : ''}`}>
                <a href={`#${category}`}
                   className={`${styles['sidebar-link']} flex-grow-1 ps-2 ${category === allCategory ? 'fw-bold text-uppercase' : ''}`}
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