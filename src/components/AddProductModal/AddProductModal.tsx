import { Modal, Button, Form } from 'react-bootstrap';
import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "../../types/types";

interface AddProductModalProps {
    categoriesList: string[];
    currentCategory?: string;
    isShowModal: boolean;
    onCloseModal: () => void;
    handleAddProduct: (product: Product) => void;
}

const AddProductModal = ({ categoriesList, currentCategory,  isShowModal, onCloseModal, handleAddProduct }: AddProductModalProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => onCloseModal();
    const handleShow = () => setShow(true);

    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [category, setCategory] = useState<string>(currentCategory || categoriesList[0]);
    const [error, setError] = useState('');
    const [validated, setValidated] = useState(false);
    
    const nameInputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (currentCategory && categoriesList.includes(currentCategory)) {
            setCategory(currentCategory);
        }
    }, [currentCategory, categoriesList]);
    
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            
            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 10);
            
            return;
        } else {
            const productData = {
                id: Date.now(), // Generate unique ID
                name: name.trim(),
                category,
                purchased: false,
                quantity
            };

            handleAddProduct(productData);
            
            // prepare form for new product
            // console.log('name=', name);
            // setName('');
            // setTimeout(() => {
            //     nameInputRef.current?.focus();
            // }, 10);
        }

        // if (editingProduct) {
        //     editProduct(editingProduct.id, productData);
        // } else {
        //     addProduct(productData);
        // }

        setValidated(false);
    };

    return (
        <>
            <Modal show={isShowModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
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

                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                                defaultValue={1}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
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
                        
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
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