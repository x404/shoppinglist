import AddProductModalManager from "./AddProductModalManager";
import AddCategoryModalManager from "./AddCategoryModalManager";
import ClearCategoryModalManager from "./ClearCategoryModalManager";
import DeleteCategoryModalManager from "./DeleteCategoryModalManager";

const ModalsManager = () => {
    return (
        <>
            <AddProductModalManager/>
            <AddCategoryModalManager/>
            <ClearCategoryModalManager/>
            <DeleteCategoryModalManager/>
        </>
    );
};

export default ModalsManager;