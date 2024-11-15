import { wait } from '../util/wait';

export const buildSubstanceSection = (): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'flex justify-between items-center content-center gap-2';
    const buildSubstanceButton = document.createElement('button');
    buildSubstanceButton.id = 'build-substance-button';
    buildSubstanceButton.className = 'flex items-center justify-between gap-2 px-3 py-2 w-full text-sm shadow-sm rounded bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 transition-colors duration-200';
    buildSubstanceButton.innerHTML = `
        <span>Build Substance</span>
        <span class="material-icons text-sm">build</span>
    `;
    const runSimulationButton = document.createElement('button'); 
    runSimulationButton.id = 'run-simulation-button';
    runSimulationButton.className = 'flex items-center justify-between gap-2 px-3 py-2 w-full text-sm shadow-sm rounded bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed';
    runSimulationButton.disabled = true;
    runSimulationButton.innerHTML = `
        <span>Run Simulation</span>
        <span class="material-icons text-sm">play_arrow</span>
    `;

    let substanceButtons = document.createElement('div');
    substanceButtons.className = 'flex flex-col items-center gap-2';
    substanceButtons.appendChild(buildSubstanceButton);
    substanceButtons.appendChild(runSimulationButton);
    
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
    container.appendChild(substanceButtons);
    return container;
};