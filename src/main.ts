// Import core components
import { TabSystem } from './tabs/tabSystem';
import { topMenuTabs, bottomMenuTabs } from './tabs/tabConfigurations';
import { setupThemeToggle } from './theme/themeToggle';
import { buildSubstanceSection } from './content/buildSubstance';
import { SimulationManager } from './simulation/simulationManager';
import { setupUI } from './ui/setup';

// UI components
function initializeUI() {
    const topMenu = new TabSystem('top-menu-container', topMenuTabs);
    const bottomMenu = new TabSystem('bottom-menu-container', bottomMenuTabs);
    
    const bottomRight = document.getElementById('bottom-right-menu-container');
    if (bottomRight) {
        bottomRight.innerHTML = buildSubstanceSection().innerHTML;
        bottomRight.className = "flex justify-between items-center content-center gap-4 bg-gray-100 dark:bg-gray-700 rounded p-4 shadow";
    } else {
        console.error('Bottom right menu container not found');
    }
    
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