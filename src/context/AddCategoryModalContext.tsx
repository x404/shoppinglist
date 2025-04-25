import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
    isAddCategoryModalOpen: boolean;
    parentCategoryId: string | undefined;
    openAddCategoryModal: (category?: string | undefined) => void;
    closeAddCategoryModal: () => void;
};

type ModalProviderProps = {
    children: ReactNode;
};

const AddCategoryModalContext = createContext<ModalContextType | undefined>(undefined);

export const AddCategoryModalProvider = ({ children }: ModalProviderProps) => {
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [parentCategoryId, setParentCategoryId] = useState<string | undefined>(undefined);

    const openAddCategoryModal = useCallback((categoryId?: string) => {
        setIsAddCategoryModalOpen(true);
        categoryId ? setParentCategoryId(categoryId) : setParentCategoryId(undefined);
        setParentCategoryId(categoryId || undefined);
    }, []);

    const closeAddCategoryModal = useCallback(() => {
        setIsAddCategoryModalOpen(false);
    }, []);

    return (
        <AddCategoryModalContext.Provider
            value={{
                isAddCategoryModalOpen,
                parentCategoryId,
                openAddCategoryModal,
                closeAddCategoryModal,
            }}
        >
            {children}
        </AddCategoryModalContext.Provider>
    );
};

export const useAddCategoryModal = () => {
    const context = useContext(AddCategoryModalContext);
    if (!context) {
        throw new Error('useAddCategoryModal must be used within a ModalProvider');
    }
    return context;
};