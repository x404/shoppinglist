import { Button } from "react-bootstrap";
import { Product } from "../../types/types";
import { useDispatch } from "react-redux";
import { deleteProduct, editProduct, togglePurchased } from "../../store/productListSlice";

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
            <li className="list-group-item">
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
                        <div id={`item-title-${product.id}`} className={`item-title ${product.purchased ? 'text-decoration-line-through' : ''}`}>
                            {product.name}
                        </div>
                        <div className="counter ms-3">
                            <span aria-hidden="true">x{product.quantity}</span>
                            <span className="visually-hidden">{product.quantity} items</span>
                        </div>
                    </div>

                    <div className="actions d-flex ms-3">
                        <Button
                            variant="outline-dark"
                            size="sm"
                            aria-label={`Edit ${product.name}`}
                            data-tooltip-id="edit-tooltip"
                            data-tooltip-content="Edit item"
                            data-tooltip-place="top"
                            onClick={onEditProduct}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16"
                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                <path
                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                            </svg>
                        </Button>
                        <Button variant="outline-dark"
                                size="sm"
                                className="delete-btn ms-1"
                                aria-label={`Delete ${product.name}`}
                                data-tooltip-id="delete-tooltip"
                                data-tooltip-content="Delete item"
                                data-tooltip-place="top"
                                onClick={onDeleteProduct}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16"
                                 fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5"/>
                            </svg>
                        </Button>
                    </div>
                </div>
            </li>
        </>
    )
}

export default ProductItem;