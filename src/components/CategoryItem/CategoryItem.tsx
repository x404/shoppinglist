import { ChangeEvent, FormEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react";

// helpers
import { isSameCategory } from "@helpers/isSameCategory";

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
    isEditingCategory: boolean;
    onOpenAddProductModal: (categoryId?: string) => void;
    onRenameCategory: (categoryId?: string) => void;
    onSaveEditCategory: (category: Category) => void;
    onCancelEditCategory: () => void;
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
                          onSaveEditCategory,
                          onCancelEditCategory,
                      }: CategoryItem) => {
    const { id: categoryId, name } = category;

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

    const wrapperRef = useRef<HTMLLIElement | null>(null);

    // ESC press and exit from edit mode

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isEditingCategory) {
                handleCancel();
                focusCategory();
            }
        };

        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (isEditingCategory && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                handleCancel();
                focusCategory();
            }
        };

        const handleFocusOut = (event: FocusEvent) => {
            if (
                isEditingCategory &&
                wrapperRef.current &&
                event.relatedTarget &&
                !wrapperRef.current.contains(event.relatedTarget as Node)
            ) {
                handleCancel();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        wrapperRef.current?.addEventListener('focusout', handleFocusOut);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
            wrapperRef.current?.removeEventListener('focusout', handleFocusOut);
        };
    }, [isEditingCategory]);
    
    
    const handleRenameCategory = () => {
        setIsHovered(false);
        onRenameCategory(categoryId);
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        if (!isFormValid(form)) {
            handleInvalidForm();
            return;
        }

        saveCategory();
        focusCategory();
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

    const focusCategory = useCallback(() => {
        setTimeout(() => {
            const focusTarget = document.querySelector(`a[href="#${category.id}"]`) as HTMLElement;
            focusTarget?.focus();
        }, 100);
    }, []);


    const saveCategory = () => {
        const updatedCategory = {
            ...category,
            ...formData,
        }

        if (isSameCategory(category, updatedCategory)) {
            handleCancel();
            return;
        }
        onSaveEditCategory(updatedCategory);
    };


    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleCancel = () => {
        onCancelEditCategory();
    };


    return (
        <>
            {isEditingCategory ? (
                <>
                    <li ref={wrapperRef} className={`${styles.menuItem} mt-1 px-2`}>
                        <CategoryEditForm
                            formData={formData}
                            validated={validated}
                            nameInputRef={nameInputRef}
                            onInputChange={handleInputChange}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    </li>
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