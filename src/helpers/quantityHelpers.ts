interface QuantityValidationOptions {
    maxLength?: number;
    min?: number;
    max?: number;
}

export const validateQuantity = (
    value: string,
    options: QuantityValidationOptions = {}
): number | null => {
    const {
        maxLength = 5,
        min = 1,
        max = 99999
    } = options;

    if (value === '' || parseInt(value) <= 0) {
        return min;
    }

    if (value.length > maxLength) {
        return null;
    }

    const parsed = parseInt(value);

    if (isNaN(parsed)) {
        return null;
    }

    return Math.min(Math.max(parsed, min), max);
};