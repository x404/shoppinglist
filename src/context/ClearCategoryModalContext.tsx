import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type ModalContextType = {
    isClearCategoryModalOpen: boolean;
    clearCategoryId: string;
    openClearCategoryModal: (categoryId: string) => void;
    closeClearCategoryModal: () => void;
};

type ModalProviderProps = {
    children: ReactNode;
};

const ClearCategoryModalContext = createContext<ModalContextType | undefined>(undefined);

export const ClearCategoryModalProvider = ({ children }: ModalProviderProps) => {
    const [isClearCategoryModalOpen, setIsClearCategoryModalOpen] = useState(false);
    const [clearCategoryId, setClearCategoryId] = useState<string>('');

    const openClearCategoryModal = useCallback((categoryId: string) => {
        console.log('openClearCategoryModal', categoryId);

        setIsClearCategoryModalOpen(true);
        setClearCategoryId(categoryId);
    }, [])

    const closeClearCategoryModal = useCallback(() => {
        setIsClearCategoryModalOpen(false);
    }, []);


    return (
        <ClearCategoryModalContext.Provider value={{
            isClearCategoryModalOpen,
            clearCategoryId,
            openClearCategoryModal,
            closeClearCategoryModal
        }}>
            {children}
        </ClearCategoryModalContext.Provider>
    )
}


export const useClearCategoryModal = () => {
    const context = useContext(ClearCategoryModalContext);
    if (!context) {
        throw new Error('useAddCategoryModal must be used within a ModalProvider');
    }
    return context;
};
