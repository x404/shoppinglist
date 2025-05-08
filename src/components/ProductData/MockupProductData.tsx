import { LocalStorageService } from "@services/LocalStorageService";
import { Button } from "react-bootstrap";

import mockupCategories from "@mockup/mockupCategories";
import mockupProducts from "@mockup/mockupProducts";

const MockupProductData = () => {
    const loadData = () => {
        LocalStorageService.set("productList", mockupProducts);
        LocalStorageService.set("categories", mockupCategories);
        refreshPage();
    }
    
    const refreshPage = () => {
        setTimeout( () => {
            location.reload()
        }, 500);
    }

    return (
        <>
            <Button className="btn ms-4 mt-3" type={"button"} onClick={loadData}>Load mockup product data</Button>
        </>
    )
}

export default MockupProductData;