export const focusElementByHref = (href: string) => {
    setTimeout(() => {
        const element = document.querySelector(`a[href="#${href}"]`) as HTMLElement | null;
        element?.focus();
    }, 200);
};