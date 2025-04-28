import { ReactNode } from "react";

import { AddProductModalProvider } from "@context/AddProductModalContext";
import { AddCategoryModalProvider } from "@context/AddCategoryModalContext";
import { ClearCategoryModalProvider } from "@context/ClearCategoryModalContext";

export const ModalProviders = ({ children }: { children: ReactNode }) => (
    <AddProductModalProvider>
        <AddCategoryModalProvider>
            <ClearCategoryModalProvider>
                {children}
            </ClearCategoryModalProvider>
        </AddCategoryModalProvider>
    </AddProductModalProvider>
);