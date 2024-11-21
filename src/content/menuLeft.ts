export const createLeftSideBody = (): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'grid gap-4';
    
    const topMenu = document.createElement('div');
    topMenu.id = 'top-menu-container';
    topMenu.className = 'bg-gray-100 dark:bg-gray-700 p-4 rounded shadow grid gap-4 content-start h-full';

    const bottomMenu = document.createElement('div');
    bottomMenu.id = 'bottom-menu-container';
    bottomMenu.className = 'bg-gray-100 dark:bg-gray-700 p-4 rounded shadow grid gap-4 content-start h-full';

    container.appendChild(topMenu);
    container.appendChild(bottomMenu);

    return container;
};