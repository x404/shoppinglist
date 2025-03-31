import { useMemo, useState } from "react";

// redux
import { useSelector } from 'react-redux';
import { selectProductItems, selectCategoriesItems } from '../../store/productListSlice';

// components
import CategoryItem from "../CategoryItem/CategoryItem";


const Sidebar = () => {
    const productList = useSelector(selectProductItems);
    const categoriesList  = useSelector(selectCategoriesItems);
    
    const allCategory = 'All';
    const defaultSelectedCategory = 'All';
    const categories = useMemo(() => [allCategory, ...categoriesList], [productList]);

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
                        {categories.map((category) => (
                            <CategoryItem
                                key={category}
                                category={category}
                                count={getCategoryCount(category)}
                                isActive={selectedCategory === category}
                                onSelectCategory={onSelectCategory}
                                allCategory={allCategory}
                            />
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;