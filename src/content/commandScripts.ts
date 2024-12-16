// The "command scripts" tab lets the user 

export const createCommandScriptsContent = (): HTMLElement => {
    const content = document.createElement('div');
    content.className = 'grid px-3 text-sm';
    content.innerHTML = `
        <div class="text-sm">
            This is the command scripts tab.
        </div>
    `;
    return content;
};