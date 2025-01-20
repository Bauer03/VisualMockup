export const createRightSideBody = (): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-4 w-[400px]';
    container.id = 'right-side-container';

    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'w-[400px] h-[400px] bg-gray-100 dark:bg-gray-700 rounded shadow';

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 400;
    canvas.height = 400;
    canvas.className = 'w-full h-full';
    
    canvasContainer.appendChild(canvas);
    container.appendChild(canvasContainer);

    return container;
}