export const buildSubstanceSection = (): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'flex justify-between items-center content-center gap-2';
    
    const buildSubstanceButton = document.createElement('button');
    buildSubstanceButton.id = 'build-substance-button';
    buildSubstanceButton.className = `
        flex items-center justify-between gap-2 px-3 py-2 text-sm
        shadow-sm dark:shadow-none rounded
        bg-blue-200 dark:bg-blue-800 
        hover:bg-blue-300 dark:hover:bg-blue-700
        text-gray-800 dark:text-gray-200
        transition-colors duration-200
    `;
    buildSubstanceButton.innerHTML = `
        <span>Build Substance</span>
        <span class="material-icons text-sm">build</span>
    `;

    const runSimulationButton = document.createElement('button');
    runSimulationButton.id = 'run-simulation-button';
    runSimulationButton.className = `
        flex items-center justify-between gap-2 px-3 py-2 text-sm
        shadow-sm dark:shadow-none rounded
        bg-blue-200 dark:bg-blue-800
        hover:bg-blue-300 dark:hover:bg-blue-700
        text-gray-800 dark:text-gray-200
        transition-colors duration-200
        disabled:bg-gray-300 dark:disabled:bg-gray-700
        disabled:text-gray-500 dark:disabled:text-gray-400
        disabled:cursor-not-allowed
    `;
    runSimulationButton.disabled = true;
    runSimulationButton.innerHTML = `
        <span>Run Simulation</span>
        <span class="material-icons text-sm">play_arrow</span>
    `;

    const substanceButtons = document.createElement('div');
    substanceButtons.className = 'flex flex-col gap-2 w-content items-end';
    substanceButtons.appendChild(buildSubstanceButton);
    substanceButtons.appendChild(runSimulationButton);
    
    const substanceControls = document.createElement('div');
    substanceControls.className = 'flex items-center gap-4';
    
    const rotationControls = document.createElement('div');
    rotationControls.className = 'grid grid-cols-2 items-center gap-2';
    
    const controlButtonClass = `
        w-10 h-10 flex items-center justify-center rounded
        border border-gray-200 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700
        transition-colors duration-200
        text-gray-600 dark:text-gray-400
    `;

    const createControlButton = (icon: string, onClick: () => void) => {
        const button = document.createElement('button');
        button.className = controlButtonClass;
        button.innerHTML = `<span class="material-icons text-base">${icon}</span>`;
        button.addEventListener('click', onClick);
        return button;
    };

    const rotateDown = createControlButton('keyboard_arrow_down', () => {
        console.log("substance being rotated to face down");
    });
    const rotateUp = createControlButton('keyboard_arrow_up', () => {
        console.log("substance being rotated to face up");
    });
    const rotateLeft = createControlButton('keyboard_arrow_left', () => {
        console.log("substance being rotated to face left");
    });
    const rotateRight = createControlButton('keyboard_arrow_right', () => {
        console.log("substance being rotated to face right");
    });

    rotationControls.append(rotateDown, rotateUp, rotateLeft, rotateRight);

    const zoomControls = document.createElement('div');
    zoomControls.className = 'flex flex-col items-center gap-2';
    
    const zoomIn = createControlButton('zoom_in', () => {
        console.log("zooming in");
    });
    const zoomOut = createControlButton('zoom_out', () => {
        console.log("zooming out");
    });

    zoomControls.append(zoomIn, zoomOut);
    substanceControls.append(rotationControls, zoomControls);
    container.append(substanceControls, substanceButtons);
    
    return container;
};