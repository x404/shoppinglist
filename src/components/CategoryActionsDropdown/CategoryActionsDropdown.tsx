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

import { useTranslation } from "react-i18next";

// styles
import styles from './CategoryActionsDropdown.module.css';
import sidebarStyles from './../Sidebar/Sidebar.module.css';

// interfaces
interface CategoryActionsDropdownProps {
    isVisible: boolean;
    count: number;
    onOpenAddProductModal: () => void;
    onOpenAddCategoryModal: () => void;
    onOpenDeleteCategoryModal: () => void;
    onRenameCategory: () => void;
    onClearCategory: () => void;
}


const CategoryActionsDropdown = ({
                                     isVisible,
                                     count,
                                     onOpenAddProductModal,
                                     onOpenAddCategoryModal,
                                     onOpenDeleteCategoryModal,
                                     onRenameCategory,
                                     onClearCategory
                                 }: CategoryActionsDropdownProps) => {
    const { t } = useTranslation();
    return (
        <div
            className={`${styles.actions} ${isVisible ? styles.visible : ""} d-flex align-items-center position-absolute me-2 end-0`}>
            <Dropdown drop="end">
                <Dropdown.Toggle
                    as="button"
                    className={`${sidebarStyles.settingsCategoryBtn} ${sidebarStyles.noRightArrow} btn d-flex align-items-center justify-content-center px-1`}
                    size="sm"
                    variant="light"
                    data-tooltip-id="custom-tooltip"
                    data-tooltip-content={t('sidebar.tooltips.createCategory')}
                    data-tooltip-place="top"
                >
                    <ThreeDots size={12}/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <ActionItem icon={<Pencil size={16}/>} label="Rename" onClick={onRenameCategory}/>
                    <ActionItem
                        icon={<XOctagon size={16}/>}
                        label={t('sidebar.menus.clear')}
                        onClick={onClearCategory}
                        disabled={count === 0}
                    />
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
                                {t('sidebar.menus.createNew')}
                            </div>

                            <ChevronRight size={12} className="ms-2 me-2"/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <ActionItem
                                icon={<FolderPlus size={16}/>}
                                label={t('sidebar.menus.category')}
                                disabled
                                onClick={onOpenAddCategoryModal}
                            />
                            <ActionItem
                                icon={<FileEarmarkPlus size={16}/>}
                                label={t('sidebar.menus.product')}
                                onClick={onOpenAddProductModal}
                            />
                        </Dropdown.Menu>
                    </Dropdown>


                    <ActionItem icon={<Shuffle size={16}/>} label={t('sidebar.menus.moveTo')} disabled onClick={() => {
                    }}/>
                    <ActionItem icon={<Palette size={16}/>} label={t('sidebar.menus.color-and-icon')} disabled onClick={() => {
                    }}/>

                    <Dropdown.Divider/>
                    <ActionItem
                        icon={<Trash size={16}/>}
                        label={t('sidebar.menus.delete')}
                        onClick={onOpenDeleteCategoryModal}
                        className={'text-danger'}
                    />
                </Dropdown.Menu>
            </Dropdown>


            <Dropdown drop="end">
                <Dropdown.Toggle
                    as="button"
                    className={` ${sidebarStyles.noRightArrow} btn d-flex align-items-center p-0 border-0`}
                    size="sm"
                    variant=""
                    data-tooltip-id="custom-tooltip"
                    data-tooltip-content={t('sidebar.menus.addProduct')}
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