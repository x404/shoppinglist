import { MouseEvent, useMemo } from "react";
import { Dropdown } from "react-bootstrap";
import { FileEarmarkPlus, FolderPlus, Plus } from "react-bootstrap-icons";


// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectProductItems } from '@store/productListSlice';
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
                <div className={`${styles.sidebarRow} d-flex justify-content-between align-items-center px-2`}>
                    <h2 className="h6 mb-0 py-2">Categories space</h2>
                    <div className={`${styles.actions}`}>
                        <Dropdown drop="end">
                            <Dropdown.Toggle
                                as="button"
                                className={`${styles.addBtn} ${styles.noRightArrow} btn d-flex align-items-center`}
                                size="sm"
                                variant=""
                                data-tooltip-id="sidebar-tooltip"
                                data-tooltip-content="Create category, add product, etc."
                                data-tooltip-place="top"
                            >
                                <Plus size={20}/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as="button" className="disabled">
                                    <div className="d-flex">
                                        <div className={`${styles.icon} me-2`}>
                                            <FolderPlus size={16}/>
                                        </div>
                                        <div className="title flex-grow-1">
                                            Category
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item as="button" className="disabled">
                                    <div className="d-flex">
                                        <div className={`${styles.icon} me-2`}>
                                            <FileEarmarkPlus size={16}/>
                                        </div>
                                        <div className="title flex-grow-1">
                                            Product
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                {/*<Dropdown.Divider/>*/}
                                {/*<Dropdown.Item as="button">Something else</Dropdown.Item>*/}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

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