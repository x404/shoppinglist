import { Badge, Button } from "react-bootstrap";

// constants
import { ALL_CATEGORY_NAME } from "../../constants/categories";
import { PlusIcon } from "../Icons/PlusIcon";

// interfaces
interface CategoryHeaderProp {
    category: string;
    counter: number;
    activeCategory: string;
    onAddProduct: (category: string) => void;
}


export const CategoryHeader = ({ category, counter, activeCategory, onAddProduct }: CategoryHeaderProp) => {
    const isAllCategory = activeCategory === ALL_CATEGORY_NAME;

    return (
        <h4 className={`d-flex align-items-center gap-2 ${isAllCategory ? 'h6 text-uppercase' : 'h5 mb-4 fw-normal'}`}>
            <div className={`${isAllCategory ? 'fw-bold' : ''}`}>{category}</div>
            <Badge bg="secondary">{counter}</Badge>
            <Button
                variant="light"
                size="sm"
                onClick={() => onAddProduct(category)}
            >
                <PlusIcon/>
                Add product
            </Button>
        </h4>
    )
};