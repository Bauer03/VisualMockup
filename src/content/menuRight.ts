export const createRightSideBody = (): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-4 w-[400px]';
    container.id = 'right-side-container';

    const contInner = document.createElement('div');
    contInner.className = 'rounded shadow';

    const canvas = document.createElement('canvas');
    canvas.className = 'class="w-full h-full bg-gray-100 dark:bg-gray-700 rounded shadow';
    canvas.id = 'canvas';
    canvas.width = 400;
    canvas.height = 400;

    contInner.appendChild(canvas);
    container.appendChild(contInner);

    return container;
};