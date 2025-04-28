import AddProductModalManager from "./AddProductModalManager";
import AddCategoryModalManager from "./AddCategoryModalManager";
import ClearCategoryModalManager from "./ClearCategoryModalManager";

const ModalsManager = () => {
    return (
        <>
            <AddProductModalManager/>
            <AddCategoryModalManager/>
            <ClearCategoryModalManager/>
        </>
    );
};

export default ModalsManager;