import { MouseEvent } from "react";

// components
import { Dropdown } from "react-bootstrap";
import {
    ChevronRight, FileEarmarkPlus, FolderPlus,
    Palette,
    Pencil,
    Plus,
    Shuffle,
    ThreeDots,
    Trash, XOctagon
} from "react-bootstrap-icons";

// styles
import styles from './CategoryItem.module.css';
import sidebarStyles from './../Sidebar/Sidebar.module.css';
import { useModal } from "../../context/ModalContext";
import { Category } from "../../types/types";


// interfaces
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


    const onAddProduct = () => {
        openAddProductModal(name);
    }

    return (
        <>
            <li className={`${styles.menuItem} ${allCategoryClass} d-flex align-items-center mt-1 px-2 position-relative ${activeClass}`}>
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
                    <div
                        className={`${sidebarStyles.actions} ${styles.actions} d-flex align-items-center position-absolute me-2 end-0`}>
                        <Dropdown drop="end">
                            <Dropdown.Toggle
                                as="button"
                                className={`${sidebarStyles.settingsCategoryBtn} ${sidebarStyles.noRightArrow} btn d-flex align-items-center justify-content-center px-1`}
                                size="sm"
                                variant="light"
                                data-tooltip-id="sidebar-tooltip"
                                data-tooltip-content="Create category, add product, etc."
                                data-tooltip-place="top"
                            >
                                <ThreeDots size={12}/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as="button" className="ps-2 disabled">
                                    <div className="d-flex">
                                        <div className={`${styles.icon} me-2`}>
                                            <Pencil size={16}/>
                                        </div>
                                        <div className={`${styles.title}`}>
                                            Rename
                                        </div>
                                    </div>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    as="button"
                                    className="ps-2  disabled"
                                >
                                    <div className="d-flex">
                                        <div className={`${styles.icon} me-2`}>
                                            <XOctagon size={16}/>
                                        </div>
                                        <div className={`${styles.title} flex-grow-1`}>
                                            Clear
                                        </div>
                                    </div>
                                </Dropdown.Item>


                                <Dropdown.Divider/>


                                <Dropdown drop="end">
                                    <Dropdown.Toggle
                                        as="button"
                                        className={`${sidebarStyles.noRightArrow} dropdown-item btn d-flex align-items-center justify-content-center px-1`}
                                        size="sm"
                                        variant="light"
                                    >
                                        <div className={`${styles.icon} mx-1`}>
                                            <Plus size={22}/>
                                        </div>


                                        <div className={`${styles.title} flex-grow-1`}>
                                            Create new
                                        </div>

                                        <ChevronRight size={12} className="ms-2 me-2"/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as="button" className="ps-2 disabled">
                                            <div className="d-flex">
                                                <div className={`${styles.icon} me-2`}>
                                                    <FolderPlus size={16}/>
                                                </div>
                                                <div className="title flex-grow-1">
                                                    Category
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button" className="ps-2" onClick={onAddProduct}>
                                            <div className="d-flex">
                                                <div className={`${styles.icon} me-2`}>
                                                    <FileEarmarkPlus size={16}/>
                                                </div>
                                                <div className="title flex-grow-1">
                                                    Product
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>


                                <Dropdown.Item
                                    as="button"
                                    className="px-1 disabled w-100"
                                >
                                    <div className="d-flex">
                                        <div className={`${styles.icon} mx-1`}>
                                            <Shuffle size={16}/>
                                        </div>
                                        <div className={`${styles.title} flex-grow-1`}>
                                            Move to
                                        </div>
                                    </div>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    as="button"
                                    className="px-1 disabled"
                                >
                                    <div className="d-flex">
                                        <div className={`${styles.icon} mx-1`}>
                                            <Palette size={16}/>
                                        </div>
                                        <div className={`${styles.title} flex-grow-1`}>
                                            Color & Icon
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item
                                    as="button"
                                    className="ps-2 text-danger disabled"
                                >
                                    <div className="d-flex">
                                        <div className={`${styles.icon} me-2`}>
                                            <Trash size={16}/>
                                        </div>
                                        <div className={`${styles.title} flex-grow-1`}>
                                            Delete
                                        </div>
                                    </div>
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>


                        <Dropdown drop="end">
                            <Dropdown.Toggle
                                as="button"
                                className={` ${sidebarStyles.noRightArrow} btn d-flex align-items-center p-0 border-0`}
                                size="sm"
                                variant=""
                                data-tooltip-id="sidebar-tooltip"
                                data-tooltip-content="Add product"
                                data-tooltip-place="top"
                            >
                                <Plus size={20}/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as="button" className="" onClick={onAddProduct}>
                                    <div className="d-flex">
                                        <div className={`${sidebarStyles.noRightArrow} me-2`}>
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
                )}
            </li>
        </>
    )
};

export default CategoryItem;