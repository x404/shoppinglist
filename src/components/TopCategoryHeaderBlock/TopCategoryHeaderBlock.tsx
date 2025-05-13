import { Button, Badge } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

// helpers
import { getCategoryNameById } from "@helpers/getCategoryNameById";
import { getProductCountByCategoryId } from "@helpers/categoryCountsHelpers";

import { Product } from "@/types/types";
import { useTranslation } from "react-i18next";

interface Props {
    activeCategoryId: string;
    categoriesList: any[];
    productList: Product[];
    onAdd: (categoryId?: string) => void;
}

const CategoryHeaderBlock = ({ activeCategoryId, categoriesList, productList, onAdd }: Props) => {
    const { t } = useTranslation();
    return (
        <div
            className={`d-flex align-items-center justify-content-between gap-2 mb-4'`}>
            <div className="d-flex align-items-center flex-grow-1">
                <h4 className=" h5 mb-0 fw-normal me-1">
                    {getCategoryNameById(categoriesList, activeCategoryId)}
                </h4>
                <Badge bg="secondary">{getProductCountByCategoryId(productList, activeCategoryId)}</Badge>
                <Button
                    variant="light"
                    size="sm"
                    onClick={() => onAdd(activeCategoryId)}
                    className="ms-2"
                >
                    <Plus size={16}/>
                    {t('buttons.title.addProduct')}
                </Button>
            </div>
        </div>
    );
};

export default CategoryHeaderBlock;