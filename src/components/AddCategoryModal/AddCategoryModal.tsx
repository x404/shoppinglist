import { Modal, Button, Form } from 'react-bootstrap';
import React, { ChangeEvent, FormEvent, memo, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from 'uuid';

// helpers
import { getCategoryNameById } from "@helpers/getCategoryNameById";

// interfaces
import { Category } from "@/types/types";
import { useTranslation } from "react-i18next";
import { CategoryTreeNode } from "../../types/types";

interface AddCategoryModalProps {
    categoriesTree: CategoryTreeNode[];
    parentCategoryId: string | undefined;
    isShowModal: boolean;
    onCloseModal: () => void;
    onAddCategory: (category: Category) => void;
}

const AddCategoryModal = ({
                             categoriesTree,
                             parentCategoryId,
                             isShowModal,
                             onCloseModal,
                             onAddCategory
                         }: AddCategoryModalProps) => {
    const { t } = useTranslation();
    
    const [name, setName] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>(parentCategoryId || '');
    const [validated, setValidated] = useState(false);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const hasInitialCategory = !!parentCategoryId;
    
    useEffect(() => {
        if (isShowModal) {
            resetFormState();
            setCategoryId('');
            focusNameInput();
        }
    }, [isShowModal]);


    useEffect(() => {
        // console.log('parentCategoryId', parentCategoryId)
        if (parentCategoryId && categoriesTree.find(category => category.id === parentCategoryId)) {
            setCategoryId(parentCategoryId);
        }
    }, [parentCategoryId, categoriesTree]);


    const categoryName = parentCategoryId
        ? getCategoryNameById(categoriesTree, parentCategoryId)
        : '';
    
    
    const handleClose = useCallback(() => {
        resetForm();
        onCloseModal();
    }, [onCloseModal]);


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (!isFormValid(form)) {
            handleInvalidForm();
            return;
        }
        
        addNewCategory();
        // resetFormState();
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

    const addNewCategory = () => {
        const categoryData = createCategoryData();
        onAddCategory(categoryData);
    };

    const createCategoryData = (): Category => {
        return {
            id: `cat-${uuidv4()}`,
            name: name.trim(),
            parentId: categoryId
        };
    };

    const resetFormState = () => {
        resetForm();
        setValidated(false);
    };

    const resetForm = () => {
        setName('');
        if (!hasInitialCategory) {
            setCategoryId('');
        }
    };

    const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }, []);


    const changeCategory = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(event.target.value);
    }, []);

    const renderCategoryOptions = (categories: Category[], level = 0): ReactNode[] => {
        return categories.flatMap(category => {
            const prefix = '-'.repeat(level);
            const option = (
                <option key={category.id} value={category.id}>
                    {prefix ? `${prefix} ` : ''}{category.name}
                </option>
            );

            const children = category.children ? renderCategoryOptions(category.children, level + 1) : [];

            return [option, ...children];
        });
    };
    
    return (
        <>
            <Modal show={isShowModal} onHide={handleClose} centered>
                <Modal.Header className="align-items-start">
                    <Modal.Title> {t('modal.createCategory')}
                        {hasInitialCategory && (
                            <div className="h6 mt-1 text-black-50">{t('modal.category')}: <strong>{categoryName}</strong></div>
                        )}
                    </Modal.Title>

                    <Button
                        variant="close"
                        aria-label={t('button.title.close')}
                        className="mt-1"
                        onClick={handleClose}
                    />
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>{t('modal.categoryName')}</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder={t('modal.addCategoryPlaceholder')}
                                onChange={handleNameChange}
                                ref={nameInputRef}
                                value={name}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {t('modal.addCategoryValidationMsg')}
                            </Form.Control.Feedback>
                        </Form.Group>
                        

                        {!hasInitialCategory && (
                            <Form.Group className="mb-3" >
                                <Form.Label>Parent category</Form.Label>
                                <Form.Select
                                    value={categoryId}
                                    onChange={changeCategory}
                                >
                                    <option value=''> {t('modal.rootCategory')} </option>
                                    {renderCategoryOptions(categoriesTree)}
                                </Form.Select>
                            </Form.Group>
                        )}

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-dark" onClick={handleClose}>
                                {t('buttons.title.close')}
                            </Button>
                            <Button variant="dark" type="submit">
                                {t('buttons.title.add')}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default memo(AddCategoryModal);