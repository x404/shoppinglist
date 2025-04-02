import { Button } from "react-bootstrap";
import { Product } from "../../types/types";
import { useDispatch } from "react-redux";
import { deleteProduct, editProduct, togglePurchased } from "../../store/productListSlice";

import styles from "./ProductItem.module.css";

const ProductItem = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    
    const onTogglePurchased = () => {
        dispatch(togglePurchased(product.id));
    }
    
    const onDeleteProduct = () => {
        dispatch(deleteProduct(product.id));
    }

    const onEditProduct = () => {
        dispatch(editProduct(product.id));
    }

    return (
        <>
            <li className={`list-group-item ${styles['product-item']}`}>
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
                        <div id={`item-title-${product.id}`} className={`${styles['item-title']} ${product.purchased ? 'text-decoration-line-through' : ''}`}>
                            {product.name}
                        </div>
                        <div className="counter ms-3">
                            <span aria-hidden="true">x{product.quantity}</span>
                            <span className="visually-hidden">{product.quantity} items</span>
                        </div>
                    </div>

                    <div className="actions d-flex ms-3 gap-1">
                        <Button
                            variant="outline-dark"
                            size="sm"
                            aria-label={`Edit ${product.name}`}
                            data-tooltip-id="edit-tooltip"
                            data-tooltip-content="Edit item"
                            data-tooltip-place="top"
                            onClick={onEditProduct}
                            className={styles.editButton}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </Button>
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
            </li>
        </>
    )
}

export default ProductItem;