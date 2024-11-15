import { wait } from '../util/wait.js';

export const buildSubstanceSection = (): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'flex justify-between items-center content-center gap-4';
    const button = document.createElement('button'); 
    button.className = 'px-4 py-3 shadow-sm rounded uppercase bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 transition-colors duration-200';
    button.innerHTML = `
        <span>Build Substance</span>
        <span class="material-icons text-sm">build</span>
    `;
    button.onclick = async () => {
        console.log('Building Substance');
        button.classList.add('animate-bounce');
        await wait(500);
        button.classList.remove('animate-bounce');
        console.log('Substance Built');
    };
    
    let substanceControls = document.createElement('div');
    substanceControls.className = 'flex items-center gap-4'
    let rotationControls = document.createElement('div');
    rotationControls.className = 'grid grid-cols-2 items-center gap-2';
    let rotateDown = document.createElement('button');
    rotateDown.className = 'w-10 h-10 flex items-center justify-center rounded border border-white dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 transition-colors duration-200';
    rotateDown.innerHTML = '<span class="material-icons text-base">keyboard_arrow_down</span>';
    rotateDown.addEventListener('click', () => {
        console.log("substance being rotated to face down");
    });
    rotationControls.appendChild(rotateDown);
    let rotateUp = document.createElement('button');
    rotateUp.className = 'w-10 h-10 flex items-center justify-center rounded border border-white dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 transition-colors duration-200';
    rotateUp.innerHTML = '<span class="material-icons text-base">keyboard_arrow_up</span>';
    rotateUp.addEventListener('click', () => {
        console.log("substance being rotated to face up");
    });
    rotationControls.appendChild(rotateUp);
    let rotateLeft = document.createElement('button');
    rotateLeft.className = 'w-10 h-10 flex items-center justify-center rounded border border-white dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 transition-colors duration-200';
    rotateLeft.innerHTML = '<span class="material-icons text-base">keyboard_arrow_left</span>';
    rotateLeft.addEventListener('click', () => {
        console.log("substance being rotated to face left");
    });
    rotationControls.appendChild(rotateLeft);
    let rotateRight = document.createElement('button');
    rotateRight.className = 'w-10 h-10 flex items-center justify-center rounded border border-white dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 transition-colors duration-200';
    rotateRight.innerHTML = '<span class="material-icons text-base">keyboard_arrow_right</span>';
    rotateRight.addEventListener('click', () => {
        console.log("substance being rotated to face right");
    });
    rotationControls.appendChild(rotateRight);

    let zoomControls = document.createElement('div');
    zoomControls.className = 'flex flex-col items-center gap-2';
    let zoomIn = document.createElement('button');
    zoomIn.className = 'w-10 h-10 flex items-center justify-center rounded border border-white dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 transition-colors duration-200';
    zoomIn.innerHTML = '<span class="material-icons text-base">zoom_in</span>';
    zoomIn.addEventListener('click', () => {
        console.log("zooming in");
    });
    zoomControls.appendChild(zoomIn);
    let zoomOut = document.createElement('button');
    zoomOut.className = 'w-10 h-10 flex items-center justify-center rounded border border-white dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 transition-colors duration-200';
    zoomOut.innerHTML = '<span class="material-icons text-base">zoom_out</span>';
    zoomOut.addEventListener('click', () => {
        console.log("zooming out");
    });
    zoomControls.appendChild(zoomOut);

    substanceControls.appendChild(rotationControls);
    substanceControls.appendChild(zoomControls);
    container.appendChild(substanceControls);
    container.appendChild(button);
    return container;
};