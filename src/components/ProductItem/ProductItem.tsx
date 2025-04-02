import { FormEvent, forwardRef, useEffect, useRef, useState } from "react";

// components
import { Button, Form } from "react-bootstrap";

// styles
import styles from "./ProductItem.module.css";

// interfaces
import { Product } from "../../types/types";

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
    const [name, setName] = useState<string>(product.name);
    const [quantity, setQuantity] = useState<number>(1);
    const [category, setCategory] = useState<string>(product.category);

    const nameInputRef = useRef<HTMLInputElement>(null);

    // ESC press and exit from edit mode
    const editButtonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && editingProductId === product.id) {
                onCancel();
                setTimeout(() => {
                    editButtonRef.current?.focus();
                }, 100)
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [editingProductId, product.id]);


    const onTogglePurchased = () => {
        onEmitTogglePurchasedProduct(product.id);
    }

    const onDeleteProduct = () => {
        onEmitDeleteProduct(product.id)
    }

    const onEditProduct = () => {
        if (product.id) {
            onEmitEditProduct(product.id);
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);

            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 100);

            return;
        }

        const updatedProduct = {
            ...product, name, quantity, category,
        }
        onSaveEditProduct(updatedProduct);
    }

    const onCancel = () => {
        resetStates();
        onCancelEditProduct();
    }

    const resetStates = () => {
        setName(product.name);
        setQuantity(product.quantity);
        setCategory(product.category);
    }


    const EditButton = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
        ({ children, ...props }, ref) => (
            <Button
                {...props}
                ref={ref}
                variant="outline-dark"
                size="sm"
                className={styles.editButton}
            >
                {children}
            </Button>
        )
    );


    return (
        <>
            <li className={`list-group-item ${styles.productItem} ${editingProductId === product.id ? styles.active : ''}`}>

                {editingProductId === product.id ? (
                    <>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-between gap-2">
                                <Form.Group className="flex-grow-1" controlId="validationCustom01">
                                    <Form.Label className="visually-hidden">Product Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        ref={nameInputRef}
                                        placeholder="Enter product name"
                                        onChange={(e) => setName(e.target.value)}
                                        defaultValue={product.name}
                                        autoFocus
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter product name
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group controlId="validationCustom01">
                                    <Form.Label className="visually-hidden">Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        min="1"
                                        defaultValue={product.quantity}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="visually-hidden">Category</Form.Label>
                                    <Form.Select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categoriesList.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>


                                <div className="actions d-flex ms-3 gap-1 align-self-start mt-1">
                                    <Button
                                        variant="outline-dark"
                                        size="sm"
                                        aria-label={`Save ${product.name}`}
                                        data-tooltip-id="edit-tooltip"
                                        data-tooltip-content="Save item"
                                        data-tooltip-place="top"
                                        onClick={onEditProduct}
                                        className={styles.saveButton}
                                        type="submit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path
                                                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                        </svg>
                                    </Button>
                                    <Button variant="outline-dark"
                                            size="sm"
                                            className={styles.deleteButton}
                                            aria-label={`Cancel`}
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Cancel or press ESC"
                                            data-tooltip-place="top"
                                            onClick={onCancel}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path
                                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        </Form>

                    </>
                ) : (
                    <>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        aria-labelledby={`item-title-${product.id}`}
                                        onChange={onTogglePurchased}
                                        defaultChecked={product.purchased}
                                    />
                                </div>
                                <div id={`item-title-${product.id}`}
                                     className={`${styles['item-title']} ${product.purchased ? 'text-decoration-line-through' : ''}`}>
                                    {product.name}
                                </div>
                                <div className="counter ms-3">
                                    <span aria-hidden="true">x{product.quantity}</span>
                                    <span className="visually-hidden">{product.quantity} items</span>
                                </div>
                            </div>

                            <div className="actions d-flex ms-3 gap-1">
                                <EditButton
                                    aria-label={`Edit ${product.name}`}
                                    onClick={onEditProduct}
                                    ref={editButtonRef}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path
                                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                    </svg>
                                </EditButton>

                                <Button variant="outline-dark"
                                        size="sm"
                                        className={styles.deleteButton}
                                        aria-label={`Delete ${product.name}`}
                                        data-tooltip-id="delete-tooltip"
                                        data-tooltip-content="Delete item"
                                        data-tooltip-place="top"
                                        onClick={onDeleteProduct}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </>
                )
                }

            </li>
        </>
    )
}

export default ProductItem;