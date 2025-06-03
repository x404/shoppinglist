import CategoryItem from "../CategoryItem/CategoryItem";
import { Category } from "@/types/types";

interface Props {
    category: Category & { children?: Category[] };
    countMap: Record<string, number>;
    activeCategoryId: string;
    editingCategoryId?: string;

    onSelectCategory: (event: React.MouseEvent<HTMLElement>, categoryId: string) => void;
    onOpenAddProductModal: (categoryId?: string) => void;
    onOpenAddCategoryModal: (categoryId?: string) => void;
    onOpenDeleteCategoryModal: (categoryId: string) => void;
    onRenameCategory: (categoryId?: string) => void;
    onClearCategory: (categoryId: string) => void;
    onSaveEditCategory: (category: Category) => void;
    onCancelEditCategory: () => void;
}

const CategoryTreeItem = ({
                              category,
                              countMap,
                              activeCategoryId,
                              editingCategoryId,
                              onSelectCategory,
                              onOpenAddProductModal,
                              onOpenAddCategoryModal,
                              onOpenDeleteCategoryModal,
                              onRenameCategory,
                              onClearCategory,
                              onSaveEditCategory,
                              onCancelEditCategory,
                          }: Props) => {
    return (
        <>
            <CategoryItem
                key={category.id}
                category={category}
                count={countMap[category.id] || 0}
                isActive={activeCategoryId === category.id}
                isEditingCategory={editingCategoryId === category.id}
                onSelectCategory={onSelectCategory}
                onOpenAddProductModal={onOpenAddProductModal}
                onOpenAddCategoryModal={onOpenAddCategoryModal}
                onOpenDeleteCategoryModal={onOpenDeleteCategoryModal}
                onRenameCategory={onRenameCategory}
                onClearCategory={onClearCategory}
                onSaveEditCategory={onSaveEditCategory}
                onCancelEditCategory={onCancelEditCategory}
            />

            {category.children && category.children.length > 0 && (
                <ul className="list-unstyled ms-3">
                    {category.children.map((child) => (
                        <CategoryTreeItem
                            key={child.id}
                            category={child}
                            countMap={countMap}
                            activeCategoryId={activeCategoryId}
                            editingCategoryId={editingCategoryId}
                            onSelectCategory={onSelectCategory}
                            onOpenAddProductModal={onOpenAddProductModal}
                            onOpenAddCategoryModal={onOpenAddCategoryModal}
                            onOpenDeleteCategoryModal={onOpenDeleteCategoryModal}
                            onRenameCategory={onRenameCategory}
                            onClearCategory={onClearCategory}
                            onSaveEditCategory={onSaveEditCategory}
                            onCancelEditCategory={onCancelEditCategory}
                        />
                    ))}
                </ul>
            )}
        </>
    );
};

export default CategoryTreeItem;