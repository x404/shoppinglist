import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";

// helpers
import { isSameProduct } from "@helpers/isSameProductHelpers";

// components
import ProductEditForm from "./ProductEditForm/ProductEditForm";
import ProductView from "./ProductView/ProductView";

// styles
import styles from "./ProductItem.module.css";

// helpers
import { validateQuantity } from "@helpers/quantityHelpers";

// interfaces
import { Product } from "@/types/types";
import { Category } from "../../types/types";


interface ProductItemProps {
    product: Product;
    isEditingProduct: boolean;
    onEditProduct: (productId: string) => void;
    onDeleteProduct: (productId: string) => void;
    onTogglePurchasedProduct: (productId: string) => void;
    onCancelEditProduct: () => void;
    onSaveEditProduct: (product: Product) => void;
    categoriesList: Category[];
}


const ProductItem = memo(({
                              product,
                              isEditingProduct,
                              onEditProduct,
                              onDeleteProduct,
                              onTogglePurchasedProduct,
                              onCancelEditProduct,
                              categoriesList,
                              onSaveEditProduct
                          }: ProductItemProps) => {

    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        name: product.name,
        quantity: product.quantity,
        categoryId: product.categoryId,
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);

    const wrapperRef = useRef<HTMLLIElement | null>(null);


    // ESC press, or focus out and exit from edit mode
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isEditingProduct) {
                handleCancel();
                focusEditInput();
            }
        };

        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (isEditingProduct && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                handleCancel();
            }
        };

        const handleFocusOut = (event: FocusEvent) => {
            if (
                isEditingProduct &&
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
    }, [isEditingProduct]);
    

    const handleTogglePurchased = useCallback(() => {
        onTogglePurchasedProduct(product.id);
    }, []);

    const handleEditProduct = useCallback(() => {
        if (product.id) {
            onEditProduct(product.id);
        }
    }, []);

    const handleDeleteProduct = useCallback(() => {
        onDeleteProduct(product.id);
        onCancelEditProduct();
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (!isFormValid(form)) {
            handleInvalidForm();
            return;
        }

        saveProduct();
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
            editButtonRef.current?.focus();
        }, 100);
    };

    const focusEditInput = () => {
        setTimeout(() => {
            editButtonRef.current?.focus();
        }, 100);
    };


    const saveProduct = () => {
        const updatedProduct = {
            ...product,
            ...formData,
        }

        if (isSameProduct(product, updatedProduct)) {
            onCancelEditProduct();
            return;
        }

        onSaveEditProduct(updatedProduct);
    };

    const resetForm = () => {
        const { name, quantity, categoryId } = product;
        setFormData({
            name,
            quantity,
            categoryId
        })
    };


    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (name === 'quantity') {
            const quantity = validateQuantity(value, {
                maxLength: 5,
                min: 1
            });

            if (quantity !== null) {
                setFormData(prevState => ({
                    ...prevState,
                    quantity: quantity
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value 
            }));
        }
    }, []);

    const handleCancel = () => {
        resetForm();
        onCancelEditProduct();
        focusEditInput();
    };

    return (
        <>
            {isEditingProduct ? (
                <>
                    <li
                        className={`list-group-item ${styles.productItem} ${isEditingProduct ? styles.active : ''}`}
                        ref={wrapperRef}
                    >
                        <ProductEditForm
                            formData={formData}
                            validated={validated}
                            categoriesList={categoriesList}
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
                        className={`list-group-item ${styles.productItem} ${isEditingProduct ? styles.active : ''}`}
                    >
                        <ProductView
                            product={product}
                            editButtonRef={editButtonRef}
                            onTogglePurchased={handleTogglePurchased}
                            onEditProduct={handleEditProduct}
                            onDeleteProduct={handleDeleteProduct}
                        />
                    </li>
                </>
            )}

        </>
    )
})

export default ProductItem;