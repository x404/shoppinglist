import { Button, Modal } from "react-bootstrap";

interface ClearCategoryModalProps {
    count: number;
    category: { clearCategoryId: string, categoryName: string, count: number };
    isShowModal: boolean;
    onConfirmClearCategoryModal: (categoryId: string) => void;
    onCloseModal: () => void;
}

export const ClearCategoryModal = ({
                                       count,
                                       category,
                                       isShowModal,
                                       onCloseModal,
                                       onConfirmClearCategoryModal
                                   }: ClearCategoryModalProps) => {

    const confirmClearCategory = () => {
        onConfirmClearCategoryModal(category.clearCategoryId);
    };

    const cancelClearCategory = () => {
        onCloseModal();
    };

    return (<>
        <Modal show={isShowModal} onHide={onCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm clearing "{category.categoryName}" ({count})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to clear this category?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelClearCategory}>
                    No
                </Button>
                <Button variant="danger" onClick={confirmClearCategory}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}