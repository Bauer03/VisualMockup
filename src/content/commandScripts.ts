export const createCommandScriptsContent = (): HTMLElement => {
    const content = document.createElement('div');
    content.className = 'grid px-3';
    content.innerHTML = '<span>Scripts Content</span>';
    return content;
};