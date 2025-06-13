import { Category, CategoryTreeNode } from "@/types/types";
import { Product } from "../types/types";

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

// Get all ID’s (nested + current)
export const getAllNestedCategoryIds = (tree: Category[], targetId: string): string[] => {
    const targetNode = findCategoryNodeById(tree, targetId);
    return targetNode ? collectAllChildIds(targetNode) : [];
};

export const groupProductsByCategory = (products: Product[]): Record<string, Product[]> => {
    return products.reduce((acc, product) => {
        const categoryId = product.categoryId;
        if (!acc[categoryId]) {
            acc[categoryId] = [];
        }
        acc[categoryId].push(product);
        return acc;
    }, {} as Record<string, Product[]>);
};