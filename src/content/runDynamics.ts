import { DataManager } from '../util/dataManager';

export const createRunDynamicsContent = (): HTMLElement => {
    const content = document.createElement('div');
    content.className = 'flex px-3 justify-between';
    content.innerHTML = `
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <label for="SimulationType" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Simulation Type</label>
                <select id="SimulationType">
                    <option value="ConstVT">Const-VT</option>
                    <option value="ConstPT">Const-PT</option>
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <label for="Temperature" class="flex justify-between items-center">
                        <span class="block text-sm font-medium text-gray-700 dark:text-gray-200">Temperature (K)</span>
                    </label>
                    <input id="Temperature" type="number" class="block w-20 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="300">
                </div>
                <div class="flex gap-2 justify-between">
                    <label for="Volume" class="flex justify-between items-center">
                        <span class="block text-sm font-medium text-gray-700 dark:text-gray-200">Volume (L/mol)</span>
                    </label>
                    <input id="Volume" type="number" class="w-20 block py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0.1">
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex gap-2 justify-between">
                <label for="TimeStep" class="flex justify-between items-center">
                    <span class="block text-sm font-medium text-gray-700 dark:text-gray-200">Time Step (ps)</span>
                </label>
                <input id="TimeStep" type="number" class="block w-20 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0.1">
            </div>
            <div class="flex gap-2 justify-between">
                <label for="NumberOfSteps" class="flex justify-between items-center">
                    <span class="block text-sm font-medium text-gray-700 dark:text-gray-200">Step Count</span>
                </label>
                <input id="NumberOfSteps" type="number" class="block w-20 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0.1">
            </div>
            <div class="flex gap-2 justify-between">
                <label for="UpdateInterval" class="flex justify-between items-center">
                    <span class="block text-sm font-medium text-gray-700 dark:text-gray-200">Interval (ps)</span>
                </label>
                <input id="UpdateInterval" type="number" class="block w-20 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0.1">
            </div>
        </div>
    `;

    // all the code below updates dataManager's runDynamicsData on change, which is then fetched when simulation is built

    let simulationType = content.querySelector("#SimulationType") as HTMLSelectElement;
    let temperature = content.querySelector("#Temperature") as HTMLInputElement;
    let volume = content.querySelector("#Volume") as HTMLInputElement;
    let timeStep = content.querySelector("#TimeStep") as HTMLInputElement;
    let stepCount = content.querySelector("#NumberOfSteps") as HTMLInputElement;
    let interval = content.querySelector("#UpdateInterval") as HTMLInputElement;

    simulationType.addEventListener("change", (event) => {
        DataManager.runDynamicsModified = true;
        const simulationType = (event.target as HTMLSelectElement).value;
        if(simulationType !== "ConstVT" && simulationType !== "ConstPT") {
            return;
        }
        DataManager.runDynamicsData.simulationType = simulationType;
        if(DataManager.simulationManager !== null) {
            let t = DataManager.simulationManager;
            t.updateSimulationType(simulationType);
        }
    });

    temperature.addEventListener("change", (event) => {
        DataManager.runDynamicsModified = true;
        const temperature = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(temperature)) {
            return;
        }
        DataManager.runDynamicsData.initialTemperature = temperature;
        if(DataManager.simulationManager !== null) {
            let t = DataManager.simulationManager;
            t.updateInitialTemperature(temperature);
        }
    });

    volume.addEventListener("change", (event) => {
        DataManager.runDynamicsModified = true;
        const volume = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(volume)) {
            return;
        }
        DataManager.runDynamicsData.initialVolume = volume;
        if(DataManager.simulationManager !== null) {
            let t = DataManager.simulationManager;
            t.updateInitialVolume(volume);
        }
    });

    timeStep.addEventListener("change", (event) => {
        DataManager.runDynamicsModified = true;
        const timeStep = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(timeStep)) {
            return;
        }
        DataManager.runDynamicsData.timeStep = timeStep;
        if(DataManager.simulationManager !== null) {
            let t = DataManager.simulationManager;
            t.updateTimeStep(timeStep);
        }
    });

    stepCount.addEventListener("change", (event) => {
        DataManager.runDynamicsModified = true;
        const stepCount = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(stepCount)) {
            return;
        }
        DataManager.runDynamicsData.stepCount = stepCount;
        if(DataManager.simulationManager !== null) {
            let t = DataManager.simulationManager;
            t.updateStepCount(stepCount);
        }
    });

    interval.addEventListener("change", (event) => {
        DataManager.runDynamicsModified = true;
        const interval = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(interval)) {
            return;
        }
        DataManager.runDynamicsData.interval = interval;
        if(DataManager.simulationManager !== null) {
            let t = DataManager.simulationManager;
            t.updateInterval(interval);
        }
    });

    return content;
};