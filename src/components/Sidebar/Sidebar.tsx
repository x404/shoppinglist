import { MouseEvent, useMemo } from "react";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductItems,
} from '@store/productListSlice';
import { selectActiveCategory, selectCategoriesItems, setActiveCategory } from "@store/categoriesSlice";

// components
import CategoryItem from "../CategoryItem/CategoryItem";

// styles
import styles from "./Sidebar.module.css";

// interfaces
import { ALL_CATEGORY_NAME } from "@constants/categories";


const Sidebar = () => {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductItems);
    console.log('tes', useSelector(selectActiveCategory));
    const categoriesList = useSelector(selectCategoriesItems);
    const activeCategory = useSelector(selectActiveCategory);

    const categories = [ALL_CATEGORY_NAME, ...categoriesList];

    const getCategoryCount = (categoryName: string): number => {
        return categoryName === ALL_CATEGORY_NAME
            ? productList.length
            : productList.filter(item => item.category === categoryName).length;
    };

    const categoryCounts = useMemo(() => {
        const counts: { [key: string]: number } = {};
        categories.forEach(category => {
            counts[category] = getCategoryCount(category);
        });

        return counts;
    }, [productList]);


    const onSelectCategory = (event: MouseEvent<HTMLAnchorElement>, category: string) => {
        event.preventDefault();
        dispatch(setActiveCategory(category));
    }

    return (
        <aside aria-label="Sidebar navigation" className={`${styles.sidebar} p-3 shadow-sm z-1`}>
            <nav>
                <h2 className="visually-hidden">Main menu</h2>
                <ul className="list-unstyled menu">
                    {categories.map((category) => (
                        <CategoryItem
                            key={category}
                            category={category}
                            count={categoryCounts[category]}
                            isActive={activeCategory === category}
                            onSelectCategory={onSelectCategory}
                            allCategory={ALL_CATEGORY_NAME}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    )
}


export default Sidebar;