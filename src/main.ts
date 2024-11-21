import { TabSystem } from './tabs/tabSystem';
import { topMenuTabs, bottomMenuTabs } from './tabs/tabConfigurations';
import { setupThemeToggle } from './theme/themeToggle';
import { buildSubstanceSection } from './content/buildSubstance';
import { SimulationManager } from './simulation/simulationManager';
import { setupUI } from './ui/setup';
import { createThemeButton } from './content/themeButton';
import { createLeftSideBody } from './content/menuLeft';
import { createRightSideBody } from './content/menuRight';

// generating the user interface
function initializeUI() {
    const container = document.getElementById('container');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    container.appendChild(createThemeButton());

    container.appendChild(createLeftSideBody());
    container.appendChild(createRightSideBody());

    const topMenu = new TabSystem('top-menu-container', topMenuTabs);
    const bottomMenu = new TabSystem('bottom-menu-container', bottomMenuTabs);

    const rightside = document.getElementById('right-side-container');
    if (rightside) {
        rightside.appendChild(buildSubstanceSection());
    } else console.error('Bottom right menu container not found');

    setupThemeToggle('theme-toggle');
}

// simulation
function initializeSimulation() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    const simulation = new SimulationManager(canvas);
    setupUI(simulation);
}

function initialize() {
    initializeUI();
    initializeSimulation();
}

initialize();