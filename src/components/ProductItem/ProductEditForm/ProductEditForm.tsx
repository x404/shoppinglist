import { Button, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useCallback, MouseEvent, Ref, useEffect, useState } from "react";

import { SaveIcon } from "@icons/SaveIcon";
import { CancelIcon } from "@icons/CancelIcon";

// styles
import styles from "./../ProductItem.module.css";

// interfaces
interface EditFormProps {
    formData: {
        name: string;
        quantity: number;
        category: string
    };
    validated: boolean;
    categoriesList: string[];
    nameInputRef: Ref<HTMLInputElement | null>;
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void,
    onCancel: () => void;
}

const ProductEditForm = ({
                             formData,
                             validated,
                             categoriesList,
                             nameInputRef,
                             onInputChange,
                             onSubmit,
                             onCancel
                         }: EditFormProps) => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");

    console.log('editForm');
    useEffect(() => {
        const { name, quantity, category } = formData;
        setName(name);
        setQuantity(quantity);
        setCategory(category);
    }, [formData.name, formData.category, formData.quantity]);

    const handleCancel = useCallback((event: MouseEvent) => {
        event.preventDefault();
        onCancel();
    }, [onCancel]);


    const handleNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => onInputChange(e),
        [onInputChange]
    );

    const handleQuantityChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => onInputChange(e),
        [onInputChange]
    );

    const handleCategoryChange = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => onInputChange(e),
        [onInputChange]
    );


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-between gap-2">
                    <Form.Group className="flex-grow-1 w-100" controlId="validationCustom01">
                        <Form.Label className="visually-hidden">Product Name</Form.Label>
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            ref={nameInputRef}
                            placeholder="Enter product name"
                            value={name}
                            autoFocus
                            onChange={handleNameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter product name
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={`${styles.counter} flex-shrink-0`} controlId="validationCustom02">
                        <Form.Label className="visually-hidden">Quantity</Form.Label>
                        <Form.Control
                            name="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </Form.Group>

                    <Form.Group className={`${styles.category} flex-grow-1 flex-md-grow-0`}>
                        <Form.Label className="visually-hidden">Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            {categoriesList.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className={`${styles.actions} d-flex justify-content-end gap-1 align-self-start mt-1`}>
                        <Button
                            variant="outline-dark"
                            size="sm"
                            aria-label={`Save ${formData.name}`}
                            data-tooltip-id="save-tooltip"
                            data-tooltip-content="Save item"
                            data-tooltip-place="top"
                            className={`${styles.saveButton} d-flex align-items-center`}
                            type="submit"
                        >
                            <SaveIcon/>
                            <span className="px-1 d-sm-none">Save</span>
                        </Button>
                        <Button variant="outline-dark"
                                size="sm"
                                className={`${styles.deleteButton} d-flex align-items-center`}
                                aria-label={`Cancel`}
                                data-tooltip-id="cancel-tooltip"
                                data-tooltip-content="Cancel or press ESC"
                                data-tooltip-place="top"
                                onClick={handleCancel}
                        >
                            <CancelIcon/>
                            <span className="px-1 d-sm-none">Cancel</span>
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default ProductEditForm;