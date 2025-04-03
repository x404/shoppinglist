import { Button, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, RefObject } from "react";

// import styles from "../ProductItem.module.css";

import styles from "./../ProductItem.module.css";


interface EditFormProps {
    formData: {
        name: string;
        quantity: number;
        category: string
    };
    validated: boolean;
    categoriesList: string[];
    nameInputRef: RefObject<HTMLInputElement | null>;
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void,
    onCancel: () => void;
}


const SaveIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
             fill="currentColor"
             className="bi bi-check-lg" viewBox="0 0 16 16">
            <path
                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
        </svg>
    )
}

const CancelIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
             fill="currentColor"
             className="bi bi-x-lg" viewBox="0 0 16 16">
            <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
    )
};

const ProductEditForm = ({
                      formData,
                      validated,
                      categoriesList,
                      nameInputRef,
                      onInputChange,
                      onSubmit,
                      onCancel
                  }: EditFormProps) => {
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
                            onChange={onInputChange}
                            defaultValue={formData.name}
                            autoFocus
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
                            onChange={onInputChange}
                            min="1"
                            defaultValue={formData.quantity}
                        />
                    </Form.Group>

                    <Form.Group className={`${styles.category} flex-grow-1 flex-md-grow-0`}>
                        <Form.Label className="visually-hidden">Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={onInputChange}
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
                            className={styles.saveButton}
                            type="submit"
                        >
                            <SaveIcon/>
                            <span className="px-1 d-sm-none">Save</span>
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