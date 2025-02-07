import { SimulationManager } from '../simulation/simulationManager';
import { DataManager } from './dataManager';

export function setupUI(simulation: SimulationManager) {
    const buildButton = document.getElementById('build-substance-button') as HTMLButtonElement;
    const runButton = document.getElementById('run-simulation-button') as HTMLButtonElement;

    if (!buildButton || !runButton) {
        console.error('Simulation button(s) not found');
        return;
    }

    buildButton.addEventListener('click', async () => {
        try {
            let curInputData = DataManager.collectInputData();
            // todo: build substance using selected data
            await simulation.toggleBuild();
            updateButtons(buildButton, runButton, simulation);
        } catch (e) {
            console.error("Error toggling substance:", e);
        }
    });

    runButton.addEventListener('click', () => {
        try {
            simulation.toggleSimulation();
            updateButtons(buildButton, runButton, simulation);
        } catch (e) {
            console.error("Error toggling simulation:", e);
        }
    });

    // Initial button state
    updateButtons(buildButton, runButton, simulation);
}

function updateButtons(
    buildButton: HTMLButtonElement, 
    runButton: HTMLButtonElement, 
    simulation: SimulationManager
) {
    const isBuilt = simulation.isSubstanceBuilt();
    const isRunning = simulation.isSimulationRunning();

    runButton.disabled = !isBuilt;
    
    const buildIcon = buildButton.querySelector(".material-icons");
    const buildText = buildButton.querySelector("span");
    const runIcon = runButton.querySelector(".material-icons");
    const runText = runButton.querySelector("span");
    
    if (buildIcon) buildIcon.textContent = isBuilt ? 'close' : 'build';
    if (buildText) buildText.textContent = isBuilt ? 'Discard' : 'Build';
    if (runIcon) runIcon.textContent = isRunning ? 'pause' : 'play_arrow';
    if (runText) runText.textContent = isRunning ? 'Stop' : 'Run';
}