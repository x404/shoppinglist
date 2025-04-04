import { Button } from "react-bootstrap";
import { ComponentProps, forwardRef, Ref } from "react";

import styles from "./../ProductItem.module.css";

// interfaces
import { Product } from "../../../types/types";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { EditIcon } from "../../Icons/EditIcon";

interface AddFormProps {
    product: Product;
    editButtonRef: Ref<HTMLButtonElement | null>;
    onTogglePurchased: () => void;
    onEditProduct: () => void;
    onDeleteProduct: () => void;
}

const EditButton = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
    ({ children, ...props }, ref) => (
        <Button
            {...props}
            ref={ref}
            variant="outline-dark"
            size="sm"
            className={styles.editButton}
            data-tooltip-id="edit-tooltip"
            data-tooltip-content="Edit item"
            data-tooltip-place="top"
        >
            {children}
        </Button>
    )
);

const ProductView = ({
                         product,
                         editButtonRef,
                         onTogglePurchased,
                         onEditProduct,
                         onDeleteProduct
                     }: AddFormProps) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center flex-grow-1">
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

                <div className={`${styles.actions} d-flex ms-3 gap-1`}>
                    
                    <EditButton
                        aria-label={`Edit ${product.name}`}
                        onClick={onEditProduct}
                        ref={editButtonRef}
                    >
                        <EditIcon/>
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
                        <DeleteIcon/>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProductView;