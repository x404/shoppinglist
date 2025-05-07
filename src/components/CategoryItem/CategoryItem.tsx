import { ChangeEvent, FormEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react";

// helpers
import { isSameCategory } from "@helpers/isSameCategory";

// constants
import { ALL_CATEGORY_OBJECT } from "@constants/categories";

// components
import CategoryEditForm from "./CategoryEditForm/CategoryEditForm";
import CategoryView from "./CategoryView/CategoryView";

// styles
import styles from './CategoryItem.module.css';

// helpers
import { focusElementByHref } from "@helpers/focusElementByHref";

// interfaces
import { Category } from "@/types/types";

interface CategoryItem {
    category: Category;
    count: number;
    isActive: boolean;
    isEditingCategory: boolean;
    onSelectCategory: (event: MouseEvent<HTMLElement>, categoryId: string) => void;
    onOpenAddProductModal: (categoryId?: string) => void;
    onOpenAddCategoryModal: (categoryId?: string) => void;
    onOpenDeleteCategoryModal: (categoryId: string) => void;
    onRenameCategory: (categoryId?: string) => void;
    onClearCategory: (categoryId: string) => void;
    onSaveEditCategory: (category: Category) => void;
    onCancelEditCategory: () => void;
}

const CategoryItem = ({
                          category,
                          count,
                          isActive,
                          isEditingCategory,
                          onSelectCategory,
                          onOpenAddProductModal,
                          onOpenAddCategoryModal,
                          onOpenDeleteCategoryModal,
                          onRenameCategory,
                          onClearCategory,
                          onSaveEditCategory,
                          onCancelEditCategory,
                      }: CategoryItem) => {
    const { id: categoryId, name: categoryName } = category;
    const allCategory = ALL_CATEGORY_OBJECT.name;


    const activeClass = isActive ? styles.active : '';

    const allCategoryClass = categoryName === allCategory ? styles.menuAllItem : '';

    const [validated, setValidated] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState({
        name: category.name
    });

    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleOpenAddProductModal = () => {
        onOpenAddProductModal(categoryId);
    }

    const handleOpenAddCategoryModal = () => {
        onOpenAddCategoryModal(categoryId);
    }

    const handleOpenDeleteCategoryModal = () => {
        console.log('handleOpenDeleteCategoryModal');
        onOpenDeleteCategoryModal(categoryId);
    }

    const wrapperRef = useRef<HTMLLIElement | null>(null);

    // ESC press and exit from edit mode

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isEditingCategory) {
                handleCancel();
                focusElementByHref(category.id);
            }
        };

        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (isEditingCategory && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                handleCancel();
                focusElementByHref(category.id);
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
        setFormData({ name: categoryName });
        setIsHovered(false);
        onRenameCategory(categoryId);
    }

    const handleClearCategory = () => {
        onClearCategory(categoryId);
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
        focusElementByHref(category.id);
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
        setFormData(prevState => ({
            ...prevState,
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
                        <CategoryView
                            count={count}
                            isActive={isActive}
                            categoryId={categoryId}
                            categoryName={categoryName}
                            isHovered={isHovered}
                            handleOpenAddProductModal={handleOpenAddProductModal}
                            handleOpenAddCategoryModal={handleOpenAddCategoryModal}
                            handleOpenDeleteCategoryModal={handleOpenDeleteCategoryModal}
                            handleRenameCategory={handleRenameCategory}
                            handleClearCategory={handleClearCategory}
                            handleSelectCategory={onSelectCategory}
                        />
                    </li>
                </>
            )
            }
        </>
    )
}

export default CategoryItem;