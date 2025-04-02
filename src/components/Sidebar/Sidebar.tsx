import { useEffect, useMemo } from "react";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectActiveCategory,
    selectProductItems,
    selectCategoriesItems,
    setActiveCategory
} from '../../store/productListSlice';

// components
import CategoryItem from "../CategoryItem/CategoryItem";

// styles
import styles from "./Sidebar.module.css";


const Sidebar = () => {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductItems);
    const categoriesList = useSelector(selectCategoriesItems);

    const ALL_CATEGORY_NAME = 'All';
    const categories  = [ALL_CATEGORY_NAME, ...categoriesList];

    console.log('categories=', categories);

    let activeCategory = useSelector(selectActiveCategory);

    
    useEffect(() => {
        if (categoriesList.indexOf(activeCategory) === -1) {
            dispatch(setActiveCategory(ALL_CATEGORY_NAME));
        }
    }, [activeCategory]);


    const getCategoryCount = (categoryName: string): number => {
        // calculation general products quantity
        // return category === allCategoryName
        //     ? productList.reduce((acc, product) => acc + +(product.quantity), 0)
        //     : productList.filter(item => item.category === category).reduce((acc, product) => acc + Number(product.quantity), 0);

        return categoryName === ALL_CATEGORY_NAME
            ? productList.length
            : productList.filter(item => item.category === categoryName).length;

    };

    const onSelectCategory = (e: React.MouseEvent<HTMLAnchorElement>, category: string) => {
        e.preventDefault();
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
                            count={getCategoryCount(category)}
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