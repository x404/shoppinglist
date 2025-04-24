import { Dropdown } from "react-bootstrap";
import {
    ChevronRight,
    FileEarmarkPlus,
    FolderPlus, Palette,
    Pencil,
    Plus,
    Shuffle,
    ThreeDots, Trash,
    XOctagon
} from "react-bootstrap-icons";

import ActionItem from "./ActionItem/ActionItem";

// styles
import styles from './CategoryActionsDropdown.module.css';
import sidebarStyles from './../Sidebar/Sidebar.module.css';

// interfaces
interface CategoryActionsDropdownProps {
    isVisible: boolean;
    onOpenAddProductModal: () => void;
    onOpenAddCategoryModal: () => void;
    onRenameCategory: () => void;
}


const CategoryActionsDropdown = ({
                                     isVisible,
                                     onOpenAddProductModal,
                                     onOpenAddCategoryModal,
                                     onRenameCategory
                                 }: CategoryActionsDropdownProps) => {

    return (
        <div
            className={`${styles.actions} ${isVisible ? styles.visible : ""} d-flex align-items-center position-absolute me-2 end-0`}>
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
                    <ActionItem icon={<Pencil size={16}/>} label="Rename" onClick={onRenameCategory}/>
                    <ActionItem icon={<XOctagon size={16}/>} label="Clear" disabled onClick={() => {
                    }}/>
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
                            <ActionItem
                                icon={<FolderPlus size={16}/>}
                                label="Category"
                                disabled
                                onClick={onOpenAddCategoryModal}
                            />
                            <ActionItem
                                icon={<FileEarmarkPlus size={16}/>}
                                label="Product"
                                onClick={onOpenAddProductModal}
                            />
                        </Dropdown.Menu>
                    </Dropdown>


                    <ActionItem icon={<Shuffle size={16}/>} label="Move to" disabled onClick={() => {
                    }}/>
                    <ActionItem icon={<Palette size={16}/>} label="Color & Icon" disabled onClick={() => {
                    }}/>

                    <Dropdown.Divider/>
                    <ActionItem icon={<Trash size={16}/>} label="Delete" disabled onClick={() => {
                    }} className={'text-danger'}/>
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
                    <ActionItem icon={<FileEarmarkPlus size={16}/>} label="Product"
                                onClick={onOpenAddProductModal}/>
                    {/*<Dropdown.Divider/>*/}
                    {/*<Dropdown.Item as="button">Something else</Dropdown.Item>*/}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default CategoryActionsDropdown;