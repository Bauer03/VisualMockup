export const createGraphicsContent = (): HTMLElement => {
    const content = document.createElement('div');
    content.className = 'grid px-3';
    content.innerHTML = '<span>Graphics Content</span>';
    return content;
};