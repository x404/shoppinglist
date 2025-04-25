import { ChangeEvent, FormEvent, MouseEvent, Ref, useCallback, useEffect, useState } from "react";
import {Form } from "react-bootstrap";

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
        const { name } = formData;
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
                </div>
            </Form>
        </>
    )
}

export default CategoryEditForm;