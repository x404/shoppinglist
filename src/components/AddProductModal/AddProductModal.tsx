import { Modal, Button, Form } from 'react-bootstrap';
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from 'uuid';

// helpers
import { getCategoryNameById } from "@helpers/getCategoryNameById";
import { validateQuantity } from "@helpers/quantityHelpers";

// interfaces
import { Product, Category } from "@/types/types";

interface AddProductModalProps {
    categoriesList: Category[];
    currentCategoryId: string | undefined;
    isShowModal: boolean;
    onCloseModal: () => void;
    onAddProduct: (product: Product) => void;
}

const AddProductModal = ({
                             categoriesList,
                             currentCategoryId,
                             isShowModal,
                             onCloseModal,
                             onAddProduct
                         }: AddProductModalProps) => {
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [categoryId, setCategoryId] = useState<string>(currentCategoryId || '');
    const [validated, setValidated] = useState(false);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const hasInitialCategory = !!currentCategoryId;


    useEffect(() => {
        if (isShowModal) {
            resetFormState();
            setCategoryId('');
        }
    }, [isShowModal]);


    useEffect(() => {
        if (currentCategoryId && categoriesList.find(category => category.id === currentCategoryId)) {
            setCategoryId(currentCategoryId);
        }
    }, [currentCategoryId, categoriesList]);


    const categoryName = currentCategoryId
        ? getCategoryNameById(categoriesList, currentCategoryId)
        : '';


    const handleClose = useCallback(() => {
        resetForm();
        onCloseModal();
    }, [onCloseModal]);


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (!isFormValid(form)) {
            handleInvalidForm();
            return;
        }

        addNewProduct();
        // resetFormState();
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
            nameInputRef.current?.focus();
        }, 100);
    };

    const addNewProduct = () => {
        const productData = createProductData();
        onAddProduct(productData);
    };

    const createProductData = (): Product => {
        return {
            id: uuidv4(),
            name: name.trim(),
            categoryId: currentCategoryId || categoryId,
            purchased: false,
            quantity
        };
    };

    const resetFormState = () => {
        resetForm();
        setValidated(false);
    };

    const resetForm = () => {
        setName('');
        setQuantity(1);
        if (!hasInitialCategory) {
            setCategoryId('');
        }
    };

    const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }, []);

    const handleQuantityChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const quantity = validateQuantity(event.target.value, {
            maxLength: 5,
            min: 1
        });

        if (quantity !== null) {
            setQuantity(quantity);
        }
    }, []);

    const changeCategory = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(event.target.value);
    }, []);


    return (
        <>
            <Modal show={isShowModal} onHide={handleClose} centered>
                <Modal.Header className="align-items-start">
                    <Modal.Title>Add New Item
                        {hasInitialCategory && (
                            <div className="h6 mt-1 text-black-50">Category: <strong>{categoryName}</strong></div>
                        )}
                    </Modal.Title>

                    <Button
                        variant="close"
                        aria-label="Close"
                        className="mt-1"
                        onClick={handleClose}
                    />
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter product name"
                                onChange={handleNameChange}
                                ref={nameInputRef}
                                value={name}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter product name
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={handleQuantityChange}
                                min="1"
                                max="10000"
                                value={quantity}
                            />
                        </Form.Group>


                        {!hasInitialCategory && (
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    required
                                    value={categoryId}
                                    onChange={changeCategory}
                                    isInvalid={validated && !categoryId}
                                >
                                    <option value=''>Choose category</option>
                                    {categoriesList.map((category) => {
                                            const { id, name } = category
                                            return (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>)
                                        }
                                    )}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please select a category
                                </Form.Control.Feedback>
                            </Form.Group>
                        )}

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-dark" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="dark" type="submit">
                                Add Product
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default memo(AddProductModal);