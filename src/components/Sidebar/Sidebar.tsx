import { MouseEvent, useContext, useMemo } from "react";
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
import { ALL_CATEGORY_OBJECT } from "@constants/categories";
import { useModal } from "../../context/ModalContext";
import { getNamesCategories } from "../../helpers/getNamesCategories";


const Sidebar = () => {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductItems);
    const categoriesList = useSelector(selectCategoriesItems);

    const activeCategory = useSelector(selectActiveCategory);
    const categories = [ALL_CATEGORY_OBJECT, ...categoriesList];


    const getCategoryCountById = (id: string): number => {
        return id === ALL_CATEGORY_OBJECT.id
            ? productList.length
            : productList.filter(product => product.categoryId === id).length;
    };


    const categoryCounts = useMemo(() => {
        const counts: { [key: string]: number } = {};
        categories.forEach(category => {
            console.log(category.id)
            counts[category.id] = getCategoryCountById(category.id);
        });
        
        return counts;
    }, [productList]);

    
    const onSelectCategory = (event: MouseEvent<HTMLAnchorElement>, categoryId: string) => {
        event.preventDefault();
        dispatch(setActiveCategory(categoryId));
    }

    const { openAddProductModal, isAddProductModalOpen, closeAddProductModal, currentCategory } = useModal();

    const onAddProduct = () => {
        openAddProductModal()
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
                                className={`${styles.addBtn} ${styles.noRightArrow} btn d-flex align-items-center p-0`}
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
                                <Dropdown.Item as="button" className="" onClick={onAddProduct}>
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
                    {/*<li className={`${styles.menuItem}  d-flex align-items-center mt-1 px-2 position-relative`}>*/}
                    {/*    <a href={`#`}*/}
                    {/*       className={`${styles.sidebarLink} flex-grow-1 ps-2`}*/}
                    {/*       title=""*/}
                    {/*       onClick={(event) => onSelectCategory(event, 'all')}*/}
                    {/*    >*/}
                    {/*        All*/}
                    {/*    </a>*/}
                    {/*    <div*/}
                    {/*        className={`${styles.counter} d-flex align-items-center justify-content-center p-1`}*/}
                    {/*        aria-label={`${categoryCounts['all']} items`}*/}
                    {/*    >*/}
                    {/*        {categoryCounts['all']}*/}
                    {/*    </div>*/}
                    {/*</li>*/}
                    
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            count={categoryCounts[category.id]}
                            isActive={activeCategory === category.id}
                            onSelectCategory={onSelectCategory}
                            allCategory={ALL_CATEGORY_OBJECT.name}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    )
}


export default Sidebar;