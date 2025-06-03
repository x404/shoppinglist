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

    const [step, setStep] = useState(1);
    const [verificationField, setVerificationField] = useState('');
    const { categoryName } = category;

    const confirmDeleteCategory = () => {
        onConfirmDeleteCategoryModal(category.deleteCategoryId);
    };

    const onHideModal = () => {
        onCloseModal();
    }

    const onExitedModal = () => {
        setStep(1);
        setVerificationField('');
    }

    const onChangeVerificationField = (event: ChangeEvent<HTMLInputElement>) => {
        setVerificationField(event.target.value);
    };

    return (
        <>
            <Modal show={isShowModal} onHide={onHideModal} onExited={onExitedModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete "{categoryName}" ({count})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center m-3">
                        <DatabaseLock width={30} height={30}></DatabaseLock>
                    </div>

                    <h3 className="text-center">{categoryName}</h3>

                    {step === 2 && <WarningStep categoryName={categoryName}/>}
                    {step === 3 && (
                        <VerificationStep
                            categoryName={categoryName}
                            verificationField={verificationField}
                            onChange={onChangeVerificationField}
                        />
                    )}

                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    {step === 1 && (
                        <Button
                            variant="secondary"
                            className="w-100"
                            onClick={() => setStep(2)}
                        >
                            I want to delete this category
                        </Button>
                    )}

                    {step === 2 && (
                        <Button
                            variant="secondary"
                            className="w-100"
                            onClick={() => setStep(3)}
                        >
                            I have read and understand these effects
                        </Button>
                    )}

                    {step === 3 && (
                        <Button
                            variant="danger"
                            className={`${verificationField !== category.categoryName ? styles.disabled : ''} w-100`}
                            onClick={confirmDeleteCategory}
                            disabled={verificationField !== category.categoryName}
                        >
                            Delete this category
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
}

const WarningStep = ({ categoryName }: { categoryName: string }) => {
    return (
        <>
            <Alert variant="warning" className="text-center px-2 py-4 mb-0">
                <ExclamationTriangle width={20} height={20} className="me-2"/>
                Unexpected bad things will happen if you don’t read this!
            </Alert>
            <div className={`${styles.infoText} mt-3 mb-1 px-3 mx-3`}>
                This will permanently delete the category <b>{categoryName}</b> and remove all subcategories and items in it.
            </div>
        </>
    );
};

const VerificationStep = ({ categoryName, verificationField, onChange }: {
    categoryName: string;
    verificationField: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
    const isInvalid = verificationField && verificationField.trim() !== categoryName;

    return (
        <>
            <hr/>
            <div className="mt-3 mb-1 fw-bold">
                To confirm, type "{categoryName}" in the box below
                <Form.Control
                    required
                    type="text"
                    value={verificationField}
                    autoFocus
                    name="verificationField"
                    className={`mt-1 ${isInvalid ? 'is-invalid' : ''}`}
                    onChange={onChange}
                />
                {/*{isInvalid && (*/}
                {/*    <div className="invalid-feedback">*/}
                {/*        Category name does not match.*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </>
    );
};