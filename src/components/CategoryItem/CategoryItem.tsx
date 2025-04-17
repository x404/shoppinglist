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
    Trash
} from "react-bootstrap-icons";

// styles
import styles from './CategoryItem.module.css';
import sidebarStyles from './../Sidebar/Sidebar.module.css';


// interfaces
interface CategoryItem {
    category: string;
    count: number;
    isActive: boolean;
    onSelectCategory: (event: MouseEvent<HTMLAnchorElement>, category: string) => void;
    allCategory: string;
}


const CategoryItem = ({ category, count, isActive, onSelectCategory, allCategory }: CategoryItem) => {
    const activeClass = isActive ? styles.active : '';
    const allCategoryHighlightClass = category === allCategory ? 'fw-bold text-uppercase' : '';
    const allCategoryClass = category === allCategory ? styles.menuAllItem : '';

    return (
        <>
            <li className={`${styles.menuItem} ${allCategoryClass} d-flex align-items-center mt-1 px-2 ${activeClass}`}>
                <a href={`#${category}`}
                   className={`${styles.sidebarLink} flex-grow-1 ps-2 ${allCategoryHighlightClass}`}
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
                {category !== allCategory && (
                    <div className={`${sidebarStyles.actions} ${styles.actions}`}>
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
                                        <Dropdown.Item as="button" className="ps-2 disabled">
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
                    </div>
                )}
            </li>
        </>
    )
};

export default CategoryItem;