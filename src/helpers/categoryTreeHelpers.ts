import { Category, CategoryTreeNode } from "@/types/types";

export const buildCategoryTree = (categories: Category[], parentId: string | null = ''): CategoryTreeNode[] => {
    return categories
        .filter(category => category.parentId === parentId)
        .map(category => ({
            ...category,
            children: buildCategoryTree(categories, category.id)
        }));
};

export const findCategoryNodeById = (nodes: Category[], targetId: string): Category | null => {
    for (const node of nodes) {
        if (node.id === targetId) return node;
        const found = node.children ? findCategoryNodeById(node.children, targetId) : null;
        if (found) return found;
    }
    return null;
};

//Collect ID of all node descendants
export const collectAllChildIds = (node: Category): string[] => {
    const ids: string[] = [node.id];
    for (const child of node.children ?? []) {
        ids.push(...collectAllChildIds(child));
    }
    return ids;
};

// Получить все ID (вложенные + текущий)
export const getAllNestedCategoryIds = (tree: Category[], targetId: string): string[] => {
    const targetNode = findCategoryNodeById(tree, targetId);
    return targetNode ? collectAllChildIds(targetNode) : [];
};