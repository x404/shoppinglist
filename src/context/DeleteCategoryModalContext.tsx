import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type ModalContextType = {
    isDeleteCategoryModalOpen: boolean;
    deleteCategoryId: string;
    openDeleteCategoryModal: (categoryId: string) => void;
    closeDeleteCategoryModal: () => void;
};

type ModalProviderProps = {
    children: ReactNode;
};

const DeleteCategoryModalContext = createContext<ModalContextType | undefined>(undefined);

export const DeleteCategoryModalProvider = ({ children }: ModalProviderProps) => {
    const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState<string>('');

    const openDeleteCategoryModal = useCallback((categoryId: string) => {
        setIsDeleteCategoryModalOpen(true);
        setDeleteCategoryId(categoryId);
    }, [])

    const closeDeleteCategoryModal = useCallback(() => {
        setIsDeleteCategoryModalOpen(false);
    }, []);


    return (
        <DeleteCategoryModalContext.Provider value={{
            isDeleteCategoryModalOpen,
            deleteCategoryId,
            openDeleteCategoryModal,
            closeDeleteCategoryModal
        }}>
            {children}
        </DeleteCategoryModalContext.Provider>
    )
}


export const useDeleteCategoryModal = () => {
    const context = useContext(DeleteCategoryModalContext);
    if (!context) {
        throw new Error('useAddCategoryModal must be used within a ModalProvider');
    }
    return context;
};
