import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from "react";

interface AddProductModalProps {
    isShowModal: boolean;
    isEditModeModal: boolean;
    onCloseModal: () => void;
}

const AddProductModal = ({ isShowModal, onCloseModal, isEditModeModal }: AddProductModalProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => onCloseModal();
    const handleShow = () => setShow(true);
    const handleSave = () => {
        console.log('onSave');
    };
    

    return (
        <>
            <Modal show={isShowModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditModeModal ? 'Edit Product' : 'Add New Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddProductModal;