import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";

// components
import ProductEditForm from "./ProductEditForm/ProductEditForm";
import ProductView from "./ProductView/ProductView";

// styles
import styles from "./ProductItem.module.css";

// interfaces
import { Product } from "../../types/types";


interface ProductItemProps {
    product: Product;
    editingProductId?: number | null;
    onEditProduct: (productId: number) => void;
    onDeleteProduct: (productId: number) => void;
    onTogglePurchasedProduct: (productId: number) => void;
    onCancelEditProduct: () => void;
    onSaveEditProduct: (product: Product) => void;
    categoriesList: string[];
}


const ProductItem = memo(({
                              product,
                              editingProductId,
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
        category: product.category,
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);

    const isEditingMode = editingProductId === product.id;

    // ESC press and exit from edit mode
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isEditingMode) {
                handleCancel();
                focusEditInput();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [editingProductId, product.id]);

    const handleTogglePurchased = useCallback(() => {
        onTogglePurchasedProduct(product.id);
    }, []);

    const handleEditProduct = () => {
        if (product.id) {
            onEditProduct(product.id);
        }
    };

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
        onSaveEditProduct(updatedProduct);
    };

    const resetForm = useCallback(() => {
        setFormData({
            name: product.name,
            quantity: product.quantity,
            category: product.category
        })
    }, [product.name, product.quantity, product.category]);


    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Math.max(1, parseInt(value as string) || 1) : value
        }));
    }, []);


    const handleCancel = useCallback(() => {
        resetForm();
        onCancelEditProduct();
        focusEditInput();
    }, []);


    return (
        <>
            <li className={`list-group-item ${styles.productItem} ${isEditingMode ? styles.active : ''}`}>

                {isEditingMode ? (
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