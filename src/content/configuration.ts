export const createConfigurationContent = (): HTMLElement => {
    const content = document.createElement('div');
    content.className = 'grid px-3';
    content.innerHTML = '<span>Configuration Content</span>';
    return content;
};