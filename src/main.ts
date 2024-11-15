import { buildSubstanceSection } from './content/buildSubstance';
import { TabSystem } from './tabs/tabSystem';
import { topMenuTabs, bottomMenuTabs } from './tabs/tabConfigurations';
import { setupThemeToggle } from './theme/themeToggle';
import { Scene3D } from './simulation/scene';

// creating tabs
const topMenu = new TabSystem('top-menu-container', topMenuTabs);
const bottomMenu = new TabSystem('bottom-menu-container', bottomMenuTabs);

const bottomRight = document.getElementById('bottom-right-menu-container');
if(bottomRight) {
    // bottomRight.appendChild(buildSubstanceSection());
    bottomRight.innerHTML = buildSubstanceSection().innerHTML;
    bottomRight.className = "flex justify-between items-center content-center gap-4 bg-gray-100 dark:bg-gray-700 rounded p-4 shadow";
}
else console.log('Could not find bottom right menu container - Build Substance button not added');

setupThemeToggle('theme-toggle');

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
if (canvas) {
    let scene = new Scene3D(canvas);
    let buildSubstanceButton = document.getElementById('build-substance-button') as HTMLButtonElement;
    buildSubstanceButton.addEventListener('click', () => {
        runSimulationButton.disabled = false;
        console.log('Building substance');
    });
    let runSimulationButton = document.getElementById('run-simulation-button') as HTMLButtonElement;
    runSimulationButton.addEventListener('click', async () => {
        console.log('Running simulation');
        await runSimulation(scene).then(() => {
            scene.rotate = false;
        });
    });
}

function runSimulation(scene: Scene3D): Promise<void> {
    scene.rotate = true;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}
