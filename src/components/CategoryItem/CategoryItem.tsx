import { ChangeEvent, FormEvent, MouseEvent, useCallback, useRef, useState } from "react";

// styles
import styles from './CategoryItem.module.css';

// interfaces
import { Category } from "@/types/types";
import CategoryActionsDropdown from "../CategoryActionsDropdown/CategoryActionsDropdown";
import CategoryEditForm from "./CategoryEditForm/CategoryEditForm";

interface CategoryItem {
    category: Category;
    count: number;
    isActive: boolean;
    onSelectCategory: (event: MouseEvent<HTMLAnchorElement>, categoryId: string) => void;
    allCategory: string;
    onOpenAddProductModal: (categoryId?: string) => void;
    onRenameCategory: (categoryId?: string) => void;
    onSaveEditCategory: (category: Category) => void;
    isEditingCategory: boolean
}


const CategoryItem = ({
                          category,
                          count,
                          isActive,
                          onSelectCategory,
                          allCategory,
                          onOpenAddProductModal,
                          onRenameCategory,
                          isEditingCategory,
                          onSaveEditCategory
                      }: CategoryItem) => {
    const { id: categoryId, name } = category;

    // const { openAddProductModal } = useModal();
    const activeClass = isActive ? styles.active : '';
    const allCategoryHighlightClass = name === allCategory ? 'fw-bold text-uppercase' : '';
    const allCategoryClass = name === allCategory ? styles.menuAllItem : '';

    const [validated, setValidated] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState({
        name: category.name
    });
    const nameInputRef = useRef<HTMLInputElement>(null);


    const handleOpenAddProductModal = () => {
        onOpenAddProductModal(categoryId);
    }

    const handleRenameCategory = () => {
        setIsHovered(false);
        onRenameCategory(categoryId);
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        // console.log(form)
        if (!isFormValid(form)) {
            handleInvalidForm();
            return;
        }

        saveCategory();
        focusEditInput();
    };

    const isFormValid = (form: HTMLFormElement): boolean => {
        return form.checkValidity();
    };

    const handleInvalidForm = () => {
        setValidated(true);
        focusNameInput();
    };

    const focusNameInput = () => {
        setTimeout(() => {
            nameInputRef.current?.focus();
        }, 100);
    };

    const focusEditInput = useCallback(() => {
        setTimeout(() => {
            // editButtonRef.current?.focus();
        }, 100);
    }, []);


    const saveCategory = () => {
        const updatedCategory = {
            ...category,
            ...formData,
        }

        //
        // if (isSameProduct(product, updatedCategory)) {
        //     onCancelEditProduct();
        //     return;
        // }
        onSaveEditCategory(updatedCategory);
    };



    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name] : value
        }));
    }, []);

    const handleCancel = () => {

        console.log('catalog edit cancel')
        // resetForm();
        // onCancelEditProduct();
        // focusEditInput();
    };
    

    return (
        <>
            {isEditingCategory ? (
                <>
                    <CategoryEditForm
                        formData={formData}
                        validated={validated}
                        nameInputRef={nameInputRef}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </>
            ) : (
                <>
                    <li
                        className={`${styles.menuItem} ${allCategoryClass} d-flex align-items-center mt-1 px-2 position-relative ${activeClass}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isEditingCategory.toString() === 'true' && ('edit')}
                        <a href={`#${categoryId}`}
                           className={`${styles.sidebarLink} flex-grow-1 ps-2 ${allCategoryHighlightClass}`}
                           {...(isActive ? { 'aria-current': 'page' } : {})}
                           title=""
                           onClick={(event) => onSelectCategory(event, categoryId)}
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
                            <CategoryActionsDropdown
                                isVisible={isHovered}
                                onOpenAddProductModal={handleOpenAddProductModal}
                                onRenameCategory={handleRenameCategory}
                            />
                        )}
                    </li>
                </>
            )

            }
        </>
    )
}

export default CategoryItem;