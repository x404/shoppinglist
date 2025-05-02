import { ChangeEvent, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { DatabaseLock, ExclamationTriangle } from "react-bootstrap-icons";

import styles from "./DeleteCategoryModal.module.css";

interface DeleteCategoryModalProps {
    count: number;
    category: { deleteCategoryId: string, categoryName: string, count: number };
    isShowModal: boolean;
    onConfirmDeleteCategoryModal: (categoryId: string) => void;
    onCloseModal: () => void;
}

export const DeleteCategoryModal = ({
                                        count,
                                        category,
                                        isShowModal,
                                        onCloseModal,
                                        onConfirmDeleteCategoryModal
                                    }: DeleteCategoryModalProps) => {
    
    const [isStep2, setIsStep2] = useState(false);
    const [isStep3, setIsStep3] = useState(false);
    const [verificationField, setVerificationField] = useState('');

    const confirmDeleteCategory = () => {
        onConfirmDeleteCategoryModal(category.deleteCategoryId);
    };

    const onHideModal = () => {
        onCloseModal();
    }

    const onExitedModal = () => {
        resetStepsProgress();
        setVerificationField('');
    }

    const showStep2 = () => {
        setIsStep2(true);
    }

    const showStep3 = () => {
        setIsStep2(false);
        setIsStep3(true);
    }

    const resetStepsProgress = () => {
        setIsStep2(false);
        setIsStep3(false);
    }

    const onChangeVerificationField = (event: ChangeEvent<HTMLInputElement>) => {
        setVerificationField(event.target.value);
    };

    return (<>
        <Modal show={isShowModal} onHide={onHideModal} onExited={onExitedModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete "{category.categoryName}" ({count})</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="d-flex justify-content-center m-3">
                    <DatabaseLock width={30} height={30}></DatabaseLock>
                </div>

                <h3 className="text-center">{category.categoryName}</h3>

                {isStep2 && (<>
                    <hr/>
                    <Alert variant="warning" className="text-center px-2 py-4 mb-0">
                        <ExclamationTriangle width={20} height={20} className='me-2'></ExclamationTriangle>
                        Unexpected bad things will happen if you don’t read this!
                    </Alert>
                    <div className={`${styles.infoText} mt-3 mb-1 px-3 mx-3`}>
                        This will permanently delete the category <b>{category.categoryName}</b> and remove all records
                        items in it.
                    </div>
                </>)}
                
                {isStep3 && (<>
                    <hr/>
                    <div className={`mt-3 mb-1 fw-bold`}>
                        To confirm, type "{category.categoryName}" in the box below
                        <Form.Control
                            required
                            type="text"
                            value={verificationField}
                            autoFocus
                            name="verificationField"
                            className={`${verificationField !== category.categoryName ? styles.verificationField : '' } mt-1`}
                            onChange={onChangeVerificationField}
                        />
                    </div>
                </>)}

            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                {!isStep2 && !isStep3 && (<Button
                        variant="secondary"
                        className="w-100"
                        onClick={showStep2}
                    >
                        I want to delete this category
                    </Button>
                )}

                {isStep2 && (
                    <Button variant="secondary" className="w-100" onClick={showStep3}> I have read and
                        understand these effects</Button>
                )}

                {isStep3 && (
                    <Button
                        variant="danger"
                        className={`${verificationField !== category.categoryName ? styles.disabled : '' } w-100`}
                        onClick={confirmDeleteCategory}
                        disabled={verificationField !== category.categoryName}
                    >
                        Delete this category
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    </>)
}