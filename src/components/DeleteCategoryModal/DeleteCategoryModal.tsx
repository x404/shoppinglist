import { Alert, Button, Form, Modal } from "react-bootstrap";
import { DatabaseLock } from "react-bootstrap-icons";

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

    const confirmDeleteCategory = () => {
        onConfirmDeleteCategoryModal(category.deleteCategoryId);
    };

    const cancelDeleteCategory = () => {
        onCloseModal();
    };

    return (<>
        <Modal show={isShowModal} onHide={onCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete "{category.categoryName}" ({count})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <div className="d-flex justify-content-center m-3">
                    <DatabaseLock width={30} height={30}></DatabaseLock>
                </div>
                
                <h3 className="text-center">{category.categoryName}</h3>

                {/*<Form noValidate validated={true} onSubmit={ () => {}}>*/}
                {/*    <Form.Group className="mb-3" controlId="validationCustom01">*/}
                {/*        /!*<Form.Label>Name</Form.Label>*!/*/}
                {/*        <Alert variant="danger">*/}
                {/*            This will permanently delete the category <b>{category.categoryName}</b> and all items in it.*/}
                {/*        </Alert>*/}
                {/*        */}
                {/*        <Form.Control*/}
                {/*            required*/}
                {/*            type="text"*/}
                {/*            placeholder="enter DELETE word for delete category"*/}
                {/*            value=''*/}
                {/*            autoFocus*/}
                {/*        />*/}
                {/*        <Form.Control.Feedback type="invalid">*/}
                {/*            Enter the word <b>DELETE</b> for delete category*/}
                {/*        </Form.Control.Feedback>*/}
                {/*    </Form.Group>*/}
                {/*</Form>*/}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                {/*<Button variant="secondary" onClick={cancelDeleteCategory}>*/}
                {/*    No*/}
                {/*</Button>*/}
                {/*<Button variant="danger" onClick={confirmDeleteCategory}>*/}
                {/*    Yes, I agree and understand these effects*/}
                {/*</Button>*/}

                <Button variant="secondary" className="w-100" onClick={confirmDeleteCategory}> I want to delete this category</Button>
                
            </Modal.Footer>
        </Modal>
    </>)
}