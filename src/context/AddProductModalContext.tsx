import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
    isAddProductModalOpen: boolean;
    currentCategoryId: string | undefined;
    openAddProductModal: (category?: string | undefined) => void;
    closeAddProductModal: () => void;
};

type ModalProviderProps = {
    children: ReactNode;
};

const AddProductModalContext = createContext<ModalContextType | undefined>(undefined);

export const AddProductModalProvider = ({ children }: ModalProviderProps) => {
    const [isAddProductModalOpen, setModalOpen] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState<string | undefined>(undefined);

    const openAddProductModal = useCallback((categoryId?: string) => {
        setModalOpen(true);
        categoryId ? setCurrentCategoryId(categoryId) : setCurrentCategoryId(undefined);
        setCurrentCategoryId(categoryId || undefined);
    }, []);

    const closeAddProductModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    return (
        <AddProductModalContext.Provider
            value={{
                isAddProductModalOpen,
                currentCategoryId,
                openAddProductModal,
                closeAddProductModal,
            }}
        >
            {children}
        </AddProductModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(AddProductModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};