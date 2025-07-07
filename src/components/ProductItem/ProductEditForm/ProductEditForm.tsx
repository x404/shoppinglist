import { Button, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, MouseEvent, Ref, useEffect, useState } from "react";

import { CheckLg, X } from "react-bootstrap-icons";

// styles
import styles from "./../ProductItem.module.css";

// interfaces
import { Category } from "@/types/types";
import { useTranslation } from "react-i18next";

interface ProductFormData {
    name: string;
    quantity: number;
    categoryId: string;
}

interface EditFormProps {
    formData: ProductFormData;
    validated: boolean;
    categoriesList: Category[];
    nameInputRef: Ref<HTMLInputElement | null>;
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void,
    onCancel: () => void;
}

const ProductEditForm = ({
                             formData,
                             validated,
                             categoriesList,
                             nameInputRef,
                             onInputChange,
                             onSubmit,
                             onCancel
                         }: EditFormProps) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        const { name, quantity, categoryId } = formData;
        setName(name);
        setQuantity(quantity);
        setCategoryId(categoryId);
    }, [formData.name, formData.categoryId, formData.quantity]);

    const handleCancel = (event: MouseEvent) => {
        event.preventDefault();
        onCancel();
    };


    const handleNameChange =
        (e: ChangeEvent<HTMLInputElement>) => onInputChange(e)
    ;

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        onInputChange(e)
    };

    const handleCategoryChange = 
        (e: ChangeEvent<HTMLSelectElement>) => {
            // only for saving semantic name of select element
            const adaptedEvent = {
                ...e,
                target: {
                    ...e.target,
                    name: "categoryId",
                    value: e.target.value
                }
            };
            onInputChange(adaptedEvent);
        };


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-between gap-2">
                    <Form.Group className="flex-grow-1 w-100" controlId="validationCustom01">
                        <Form.Label className="visually-hidden">{t('modal.taskTitle')}</Form.Label>
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            ref={nameInputRef}
                            placeholder={t('modal.enterTaskTitle')}
                            value={name}
                            autoFocus
                            onChange={handleNameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            {t('modal.errorsMsg.enterTaskTitle')}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={`${styles.counter} flex-shrink-0`} controlId="validationQuantity">
                        <Form.Label className="visually-hidden">Quantity</Form.Label>
                        <Form.Control
                            name="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </Form.Group>

                    <Form.Group className={`${styles.category} flex-grow-1 flex-md-grow-0`}>
                        <Form.Label className="visually-hidden"> {t('modal.category')}</Form.Label>

                        {/* although named 'category' for HTML semantics, this stores categoryId*/}
                        <Form.Select
                            name="category"
                            value={categoryId}
                            onChange={handleCategoryChange}
                        >
                            {categoriesList.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className={`${styles.actions} d-flex justify-content-end gap-1 align-self-start mt-1`}>
                        <Button
                            variant="outline-dark"
                            size="sm"
                            aria-label={`Save ${formData.name}`}
                            data-tooltip-id="save-tooltip"
                            data-tooltip-content={t('buttons.tooltip.saveItem')}
                            data-tooltip-place="top"
                            className={`${styles.saveButton} ${styles.actionButton} d-flex align-items-center`}
                            type="submit"
                        >
                            <CheckLg size="20"/>
                            <span className="px-1 d-sm-none">{t('buttons.title.save')}</span>
                        </Button>
                        <Button variant="outline-dark"
                                size="sm"
                                className={`${styles.cancelButton} ${styles.actionButton} d-flex align-items-center`}
                                aria-label={t('buttons.title.cancel')}
                                data-tooltip-id="cancel-tooltip"
                                data-tooltip-content={t('buttons.tooltip.cancel')}
                                data-tooltip-place="top"
                                onClick={handleCancel}
                        >
                            <X size="24"/>
                            <span className="px-1 d-sm-none">{t('buttons.title.cancel')}</span>
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default ProductEditForm;