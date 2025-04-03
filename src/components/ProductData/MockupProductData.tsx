import { LocalStorageService } from "../../services/LocalStorageService";
import { Button } from "react-bootstrap";

const MockupProductData = () => {
    const products = [
        {
            "name": "Banana",
            "quantity": 2,
            "category": "Fruits",
            "purchased": false,
            "id": 1
        },
        {
            "name": "Apple",
            "quantity": 3,
            "category": "Vegetables",
            "purchased": false,
            "id": 2
        },
        {
            "name": "Milk",
            "quantity": 4,
            "category": "Dairy",
            "purchased": false,
            "id": 3
        },
        {
            "name": "Chees",
            "quantity": 5,
            "category": "Dairy",
            "purchased": false,
            "id": 4
        },
        {
            "id": 1743520846384,
            "name": "foo",
            "category": "Fruits",
            "purchased": false,
            "quantity": 1
        }];
    const loadData = () => {
        LocalStorageService.set("productList", products);
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