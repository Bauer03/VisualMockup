import { TabSystem } from './tabs/tabSystem';
import { getTopMenuTabs, getBottomMenuTabs } from './tabs/tabConfigurations';
import { setupThemeToggle } from './theme/themeToggle';
import { buildSubstanceSection } from './content/buildSubstance';
import { SimulationManager } from './simulation/simulationManager';
import { setupUI } from './util/buttonsetup';
import { createThemeButton } from './content/themeButton';
import { createLeftSideBody } from './content/menuLeft';
import { createRightSideBody } from './content/menuRight';
import { DataManager } from './util/dataManager';

// generating the user interface
async function initializeUI() {
    const container = document.getElementById('container');
    if (!container) {
        console.error('Container element in which to append UI not found');
        return;
    }
    container.appendChild(createThemeButton());
    container.appendChild(createLeftSideBody());
    container.appendChild(createRightSideBody());

    const topTabs = await getTopMenuTabs();
    const topMenu = new TabSystem('top-menu-container', topTabs);
    const bottomTabs = await getBottomMenuTabs();
    const bottomMenu = new TabSystem('bottom-menu-container', bottomTabs);

    const rightside = document.getElementById('right-side-container');
    if (rightside) {
        rightside.appendChild(buildSubstanceSection());
    } else console.error('Bottom right menu container not found');

    setupThemeToggle('theme-toggle');
}

// Make initialize async
async function initialize() {
    await initializeUI();
    initializeSimulation();
}

initialize();

// simulation
function initializeSimulation() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    DataManager.simulationManager = new SimulationManager(canvas, DataManager.inputData, DataManager.outputData);
    setupUI(DataManager.simulationManager);
}