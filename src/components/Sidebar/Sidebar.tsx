import styles from './Sidebar.module.css';
import { useSelector } from 'react-redux';
import { selectProductItems } from '../../store/productListSlice';
import { Product } from "../../types/types";
import { useMemo, useState } from "react";

const getNamesCategories = (productList: Product[]): string[] => {
    const categories = new Set(productList.map(product => product.category));
    return Array.from(categories);
}

const Sidebar = () => {
    const { productList } = useSelector(selectProductItems);
    const allCategory = 'All';
    const defaultSelectedCategory = 'All';
    const categories = useMemo(() => [allCategory, ...getNamesCategories(productList)], [productList]);

    const [selectedCategory, setSelectedCategory] = useState(
        categories.includes(defaultSelectedCategory) ? defaultSelectedCategory : categories[0]
    );
    
    const getCategoryCount = (category: string): number => {
        return category === allCategory
            ? productList.reduce((acc, product) => acc + +(product.quantity), 0)
            : productList.filter(item => item.category === category).reduce((acc, product) => acc + Number(product.quantity), 0);
    };

    const onSelectCategory = (e: React.MouseEvent<HTMLAnchorElement>, category: string) => {
        e.preventDefault();
        setSelectedCategory(category);
        
        // TODO: make dispatch
        console.log(`Selected category: ${category}`);
    }

    return (
        <>
            <aside aria-label="Sidebar navigation" className="sidebar p-3 shadow-sm z-1">
                <nav>
                    <h2 className="visually-hidden">Main menu</h2>
                    <ul className="list-unstyled menu">
                        {categories.map((category) => {
                            const isActiveCategory = selectedCategory === category;
                            const count = getCategoryCount(category);

                            return (
                                <li
                                    className={`${styles['menu-item']} d-flex align-items-center mt-1 ps-2 pe-2 ${isActiveCategory ? `${styles.active}` : ''}`}
                                    key={category}
                                >
                                    {/*TODO: Router Link*/}
                                    <a href={`#${category}`}
                                       className={`${styles['sidebar-link']} flex-grow-1 ps-2 ${category === allCategory ? 'fw-bold text-uppercase' : ''}`}
                                       {...(isActiveCategory ? { 'aria-current': 'page' } : {})}
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
                            )
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;