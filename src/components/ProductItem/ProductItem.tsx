import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";

// helpers
import { isSameProduct } from "@helpers/isSameProduct";

// components
import ProductEditForm from "./ProductEditForm/ProductEditForm";
import ProductView from "./ProductView/ProductView";

// styles
import styles from "./ProductItem.module.css";

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


    // ESC press and exit from edit mode
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isEditingProduct) {
                handleCancel();
                focusEditInput();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
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

    const focusEditInput = useCallback(() => {
        setTimeout(() => {
            editButtonRef.current?.focus();
        }, 100);
    }, []);


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

    const resetForm = useCallback(() => {
        const { name, quantity, categoryId } = product;
        setFormData({
            name,
            quantity,
            categoryId
        })
    }, [product.name, product.quantity, product.categoryId]);


    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Math.max(1, parseInt(value as string) || 1) : value
        }));
    }, []);

    const handleCancel = () => {
        resetForm();
        onCancelEditProduct();
        focusEditInput();
    };

    return (
        <>
            <li
                className={`list-group-item ${styles.productItem} ${isEditingProduct ? styles.active : ''}`}
            >

                {isEditingProduct ? (
                    <>
                        <ProductEditForm
                            formData={formData}
                            validated={validated}
                            categoriesList={categoriesList}
                            nameInputRef={nameInputRef}
                            onInputChange={handleInputChange}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    </>
                ) : (
                    <>
                        <ProductView
                            product={product}
                            editButtonRef={editButtonRef}
                            onTogglePurchased={handleTogglePurchased}
                            onEditProduct={handleEditProduct}
                            onDeleteProduct={handleDeleteProduct}
                        />
                    </>
                )}
            </li>
        </>
    )
})

export default ProductItem;