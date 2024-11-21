// Import core components
import { TabSystem } from './tabs/tabSystem';
import { topMenuTabs, bottomMenuTabs } from './tabs/tabConfigurations';
import { setupThemeToggle } from './theme/themeToggle';
import { buildSubstanceSection } from './content/buildSubstance';
import { SimulationManager } from './simulation/simulationManager';
import { setupUI } from './ui/setup';
import { createThemeButton } from './content/themeButton';

// UI components
function initializeUI() {
    const container = document.getElementById('container');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    container.appendChild(createThemeButton());
    container.innerHTML += `
        <div class="grid gap-4">
            <div id="top-menu-container" 
                 class="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow grid gap-4 content-start h-full">
                <!-- Tab content will be inserted here by JavaScript -->
            </div>
            
            <div id="bottom-menu-container" 
                 class="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow grid gap-4 content-start h-full">
                <!-- Tab content will be inserted here by JavaScript -->
            </div>
        </div>

        <div class="grid gap-4 w-[400px]">
            <div class="rounded shadow">
                <canvas id="canvas" 
                        class="w-full h-full bg-gray-100 dark:bg-gray-700 rounded shadow" width="400" height="400">
                </canvas>
            </div>
            <div id="bottom-right-menu-container">
                <!-- Additional content -->
            </div>
        </div>
    `;
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