import { Button, Form } from "react-bootstrap";
import { CheckLg, X } from "react-bootstrap-icons";

// styles
import styles from "./../CategoryItem.module.css";
import { ChangeEvent, FormEvent, MouseEvent, Ref, useCallback, useEffect, useState } from "react";

// interfaces
interface CategoryFormData {
    name: string;
}

interface EditCategoryFormProps {
    formData: CategoryFormData;
    validated: boolean;
    nameInputRef: Ref<HTMLInputElement | null>;
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void,
    onCancel: () => void;
}


const CategoryEditForm = ({
                              formData,
                              validated,
                              nameInputRef,
                              onInputChange,
                              onSubmit,
                              onCancel
                          }: EditCategoryFormProps) => {

    const [name, setName] = useState("");

    useEffect(() => {
        const { name, } = formData;
        setName(name);
    }, [formData.name]);


    const handleNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => onInputChange(e),
        [onInputChange]
    );

    const handleCancel = useCallback((event: MouseEvent) => {
        event.preventDefault();
        onCancel();
    }, [onCancel]);


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-between gap-2">
                    <Form.Group className="flex-grow-1 w-100" controlId="validationCustom01">
                        <Form.Label className="visually-hidden">Category</Form.Label>
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            ref={nameInputRef}
                            placeholder="Enter category name"
                            value={name}
                            autoFocus
                            onChange={handleNameChange}
                            className="py-1"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter category name
                        </Form.Control.Feedback>
                    </Form.Group>


                    {/*<div className={`${styles.actions} d-flex justify-content-end gap-1 align-self-start mt-1 d-none`}>*/}
                    {/*    <Button*/}
                    {/*        variant="outline-dark"*/}
                    {/*        size="sm"*/}
                    {/*        aria-label={`Save ${formData.name}`}*/}
                    {/*        data-tooltip-id="save-tooltip"*/}
                    {/*        data-tooltip-content="Save item"*/}
                    {/*        data-tooltip-place="top"*/}
                    {/*        className={`${styles.saveButton} ${styles.actionButton} d-flex align-items-center`}*/}
                    {/*        type="submit"*/}
                    {/*    >*/}
                    {/*        <CheckLg size="20"/>*/}
                    {/*        <span className="px-1 d-sm-none">Save</span>*/}
                    {/*    </Button>*/}
                    {/*    <Button variant="outline-dark"*/}
                    {/*            size="sm"*/}
                    {/*            className={`${styles.cancelButton} ${styles.actionButton} d-flex align-items-center`}*/}
                    {/*            aria-label={`Cancel`}*/}
                    {/*            data-tooltip-id="cancel-tooltip"*/}
                    {/*            data-tooltip-content="Cancel or press ESC"*/}
                    {/*            data-tooltip-place="top"*/}
                    {/*            onClick={handleCancel}*/}
                    {/*    >*/}
                    {/*        <X size="24"/>*/}
                    {/*        <span className="px-1 d-sm-none">Cancel</span>*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
            </Form>
        </>
    )
}

export default CategoryEditForm;