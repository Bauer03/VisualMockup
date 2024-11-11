export const createRunDynamicsContent = (): HTMLElement => {
    const content = document.createElement('div');
    content.className = 'grid px-3';
    content.innerHTML = '<span>Run Dynamics Content</span>';
    return content;
};