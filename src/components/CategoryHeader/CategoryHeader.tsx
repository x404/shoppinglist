import { memo } from "react";
import { Badge, Button } from "react-bootstrap";

interface CategoryHeader {
    category: string;
    counter: number;
    activeCategory: string;
    onAddProduct: (category: string) => void;
}

const ALL_CATEGORY_NAME = 'All';

export const CategoryHeader = memo(({ category, counter, activeCategory, onAddProduct }: CategoryHeader) => {
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
                    <svg xmlns="http://www.w3.org/2000/svg"
                         aria-hidden="true"
                         width="16"
                         height="16"
                         fill="currentColor"
                         className="bi bi-plus"
                         viewBox="0 0 16 16"
                    >
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    Add product
                </Button>
            </h4>
        )
    }
);