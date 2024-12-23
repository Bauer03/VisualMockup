import { getCurScene } from "../simulation/simulationManager";
import { DataManager } from "../util/dataManager";

export const buildSubstanceSection = (): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'flex justify-between items-center content-center gap-4 bg-gray-100 dark:bg-gray-700 rounded p-4 shadow h-full';
    
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
        disabled:bg-gray-300 dark:disabled:bg-gray-600
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

    type ControlAction = 'rotate' | 'zoom';
    type ControlParams = {
        icon: string;
        action: ControlAction;
        axis?: 'x' | 'y';
        sign?: '+' | '-';
    };

    // Creates buttons for rotation and zooming
    const createControlButton = (params: ControlParams) => {
        const button = document.createElement('button');
        button.className = controlButtonClass;
        button.innerHTML = `<span class="material-icons text-base">${params.icon}</span>`;
        
        button.addEventListener('click', () => {
            const curScene = getCurScene();
            if (!curScene) {
                console.log("Substance may not be built yet.");
                return;
            }
            if (params.action === 'rotate') {
                console.log(`substance being rotated to face ${params.icon.replace('keyboard_arrow_', '')}`);
                curScene.rotateSubstance({ rotationAxis: params.axis!, sign: params.sign! });
            } else {
                console.log(`${params.sign === '+' ? 'zooming in' : 'zooming out'}`)
                curScene.zoomCamera(params.sign === '+' ? true : false);
            }
        });
        
        return button;
    };

    const rotateDown = createControlButton({ icon: 'keyboard_arrow_down', action: 'rotate', axis: 'x', sign: '+' });
    const rotateUp = createControlButton({ icon: 'keyboard_arrow_up', action: 'rotate', axis: 'x', sign: '-' });
    const rotateLeft = createControlButton({ icon: 'keyboard_arrow_left', action: 'rotate', axis: 'y', sign: '-' });
    const rotateRight = createControlButton({ icon: 'keyboard_arrow_right', action: 'rotate', axis: 'y', sign: '+' });

    rotationControls.append(rotateLeft, rotateUp, rotateRight, rotateDown);

    const zoomControls = document.createElement('div');
    zoomControls.className = 'flex flex-col items-center gap-2';
    
    const zoomIn = createControlButton({ icon: 'zoom_in', action: 'zoom', sign: '+' });
    const zoomOut = createControlButton({ icon: 'zoom_out', action: 'zoom', sign: '-' });

    zoomControls.append(zoomIn, zoomOut);
    substanceControls.append(rotationControls, zoomControls);
    container.append(substanceControls, substanceButtons);
    
    return container;
};