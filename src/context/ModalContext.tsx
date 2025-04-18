import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
    isAddProductModalOpen: boolean;
    currentCategory: string | undefined;
    openAddProductModal: (category?: string | undefined) => void;
    closeAddProductModal: () => void;
};

type ModalProviderProps = {
    children: ReactNode;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [isAddProductModalOpen, setModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<string | undefined>(undefined);

    const openAddProductModal = useCallback((category?: string) => {
        console.log('category', category);
        setModalOpen(true);
        category ? setCurrentCategory(category) : setCurrentCategory(undefined);
        setCurrentCategory(category || undefined);
    }, []);

    const closeAddProductModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    return (
        <ModalContext.Provider
            value={{
                isAddProductModalOpen,
                currentCategory,
                openAddProductModal,
                closeAddProductModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};