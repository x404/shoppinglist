import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

// styles
import styles from "./ProductItem.module.css";

// interfaces
import { Product } from "../../types/types";
import ProductEditForm from "./ProductEditForm/ProductEditForm";
import ProductView from "./ProductView/ProductView";

interface ProductItemProps {
    product: Product;
    editingProductId?: number;
    onEmitEditProduct: (productId: number) => void;
    onEmitDeleteProduct: (productId: number) => void;
    onEmitTogglePurchasedProduct: (productId: number) => void;
    onCancelEditProduct: () => void;
    onSaveEditProduct: (product: Product) => void;
    categoriesList: string[];
}


const ProductItem = ({
                         product,
                         editingProductId,
                         onEmitEditProduct,
                         onEmitDeleteProduct,
                         onEmitTogglePurchasedProduct,
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

    // ESC press and exit from edit mode
    const editButtonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && editingProductId === product.id) {
                handleCancel();
                focusEditInput();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [editingProductId, product.id]);

    const handleTogglePurchased = () => {
        onEmitTogglePurchasedProduct(product.id);
    }

    const handleDeleteProduct = () => {
        onEmitDeleteProduct(product.id)
    }

    const handleEditProduct = () => {
        if (product.id) {
            onEmitEditProduct(product.id);
        }
    }

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
    }
    
    const handleCancel = () => {
        resetForm();
        onCancelEditProduct();
        focusEditInput();
    }
    
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
        onSaveEditProduct(updatedProduct);
    }

    const resetForm = () => {
        setFormData({
            name: product.name,
            quantity: product.quantity,
            category: product.category
        })
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Math.max(1, parseInt(value as string) || 1) : value
        }));
    };
    
    return (
        <>
            <li className={`list-group-item ${styles.productItem} ${editingProductId === product.id ? styles.active : ''}`}>

                {editingProductId === product.id ? (
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
                )
                }
            </li>
        </>
    )
}

export default ProductItem;