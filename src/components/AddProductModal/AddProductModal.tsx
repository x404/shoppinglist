import { Modal, Button, Form } from 'react-bootstrap';
import { FormEvent, useEffect, useRef, useState } from "react";

// interfaces
import { Product } from "../../types/types";

interface AddProductModalProps {
    categoriesList: string[];
    currentCategory?: string;
    isShowModal: boolean;
    onCloseModal: () => void;
    handleAddProduct: (product: Product) => void;
}

const AddProductModal = ({
                             categoriesList,
                             currentCategory,
                             isShowModal,
                             onCloseModal,
                             handleAddProduct
                         }: AddProductModalProps) => {

    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [category, setCategory] = useState<string>(currentCategory || '');
    const [validated, setValidated] = useState(false);
    
    const nameInputRef = useRef<HTMLInputElement>(null);

    const hasInitialCategory = !!currentCategory;

    useEffect(() => {
        if (currentCategory && categoriesList.includes(currentCategory)) {
            setCategory(currentCategory);
        } else {
            setCategory('');
        }
    }, [currentCategory, categoriesList]);


    const handleClose = () => {
        resetStates();
        onCloseModal();
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (!isFormValid(form)) {
            handleInvalidForm();
            return;
        }

        addNewProduct();
        resetFormState();
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
        handleAddProduct(productData);
    };

    const createProductData = (): Product => {
        return {
            id: Date.now(), // Generate unique ID
            name: name.trim(),
            category,
            purchased: false,
            quantity
        };
    };

    const resetFormState = () => {
        resetStates();
        setValidated(false);
    }

    const resetStates = () => {
        setName('');
        setQuantity(1);
    }

    const changeCategory = (name: string): void => {
        setCategory(name);
    }


    return (
        <>
            <Modal show={isShowModal} onHide={handleClose} centered>
                <Modal.Header className="" closeButton>
                    <Modal.Title>Add New Product
                        {hasInitialCategory && (
                            <div className="h6 mt-1 text-black-50">Category: <strong>{category}</strong></div>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter product name"
                                onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                                defaultValue={1}
                            />
                        </Form.Group>


                        {!hasInitialCategory && (
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    required
                                    value={category}
                                    onChange={(e) => changeCategory(e.target.value)}
                                    isInvalid={validated && !category}
                                >
                                    <option value=''>Choose category</option>
                                    {categoriesList.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
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
}

export default AddProductModal;