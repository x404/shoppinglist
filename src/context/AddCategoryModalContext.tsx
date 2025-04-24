import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
    isAddCategoryModalOpen: boolean;
    currentCategoryId: string | undefined;
    openAddCategoryModal: (category?: string | undefined) => void;
    closeAddCategoryModal: () => void;
};

type ModalProviderProps = {
    children: ReactNode;
};

const AddCategoryModalContext = createContext<ModalContextType | undefined>(undefined);

export const AddCategoryModalProvider = ({ children }: ModalProviderProps) => {
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState<string | undefined>(undefined);

    const openAddCategoryModal = useCallback((categoryId?: string) => {
        setIsAddCategoryModalOpen(true);
        categoryId ? setCurrentCategoryId(categoryId) : setCurrentCategoryId(undefined);
        setCurrentCategoryId(categoryId || undefined);
    }, []);

    const closeAddCategoryModal = useCallback(() => {
        setIsAddCategoryModalOpen(false);
    }, []);

    return (
        <AddCategoryModalContext.Provider
            value={{
                isAddCategoryModalOpen,
                currentCategoryId,
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