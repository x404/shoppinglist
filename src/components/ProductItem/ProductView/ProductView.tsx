import { Button } from "react-bootstrap";
import { forwardRef, RefObject } from "react";

import styles from "./../ProductItem.module.css";

// interfaces
import { Product } from "../../../types/types";
import { DeleteIcon } from "../../Icons/DeleteIcon";

interface AddFormProps {
    product: Product;
    editButtonRef: RefObject<HTMLButtonElement | null>;
    onTogglePurchased: () => void;
    onEditProduct: () => void;
    onDeleteProduct: () => void;
}

const EditButton = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
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

const EditIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-pencil" viewBox="0 0 16 16">
            <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
        </svg>
    )
}


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