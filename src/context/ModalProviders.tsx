import { ReactNode } from "react";

import { AddProductModalProvider } from "./AddProductModalContext";
import { AddCategoryModalProvider } from "./AddCategoryModalContext";
import { ClearCategoryModalProvider } from "./ClearCategoryModalContext";
import { DeleteCategoryModalProvider } from "./DeleteCategoryModalContext";

export const ModalProviders = ({ children }: { children: ReactNode }) => (
    <AddProductModalProvider>
        <AddCategoryModalProvider>
            <ClearCategoryModalProvider>
                <DeleteCategoryModalProvider>
                    {children}
                </DeleteCategoryModalProvider>
            </ClearCategoryModalProvider>
        </AddCategoryModalProvider>
    </AddProductModalProvider>
);