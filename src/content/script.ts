import { dbManager } from '../db/databaseManager';
import { DataManager } from '../util/dataManager';

export const createCommandScriptsContent = async (): Promise<HTMLElement> => {
    const content = document.createElement('div');
    content.className = 'grid gap-4 px-3 py-4';

    const runCount = document.createElement('div');
    runCount.className = 'grid gap-2';
    runCount.innerHTML = `
        <label class="text-sm font-medium">Number of Runs</label>
        <input type="number" id="runCount" min="1" max="100" value="1" 
               class="px-2 py-1 rounded border dark:bg-gray-700 dark:border-gray-600">
        <div class="text-xs text-gray-500">Maximum 500 runs at a time</div>
    `;

    const runButton = document.createElement('button');
    runButton.className = 'px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors';
    runButton.textContent = 'Run Simulations';

    const progressDiv = document.createElement('div');
    progressDiv.id = 'runProgress';
    progressDiv.className = 'text-sm hidden';

    runButton.onclick = async (e) => {
        e.preventDefault();
        const count = parseInt((document.getElementById('runCount') as HTMLInputElement).value);
        if(count > 500 || isNaN(count)) { // can't go > 500 runs at once (probably could but...), and can't be NaN 
            return;
        }
        runButton.disabled = true;
        runButton.textContent = 'Running...';
        progressDiv.classList.remove('hidden');

        try {
            for (let i = 0; i < count; i++) {
                progressDiv.textContent = `Running simulation ${i + 1} of ${count}...`;
                let currentData = DataManager.getCurrentSimulationRun();
                await dbManager.addOutput(currentData);
            }
            progressDiv.textContent = `Completed ${count} simulations`;
        } catch (error) {
            progressDiv.textContent = `Error.`;
        } finally {
            runButton.disabled = false;
            runButton.textContent = 'Run Simulations';
            setTimeout(() => progressDiv.classList.add('hidden'), 2000);
        }
    };

    // update the runCount input when the number of runs changes
    runCount.addEventListener("change", (event) => {
        DataManager.runDynamicsModified = true;
        const runCount = parseInt((event.target as HTMLInputElement).value);
        if(isNaN(runCount)) {
            return;
        }
        DataManager.runDynamicsData.stepCount = runCount;
        if(DataManager.simulationManager !== null) {
            let t = DataManager.simulationManager;
            t.updateRunCount(runCount);
        }
    });

    content.appendChild(runCount);
    content.appendChild(runButton);
    content.appendChild(progressDiv);

    return content;
};