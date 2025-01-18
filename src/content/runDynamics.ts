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
        const simulationType = (event.target as HTMLSelectElement).value;
        if(simulationType !== "ConstVT" && simulationType !== "ConstPT") {
            return;
        }
        DataManager.runDynamicsData.simulationType = simulationType;
    });

    temperature.addEventListener("change", (event) => {
        const temperature = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(temperature)) {
            return;
        }
        DataManager.runDynamicsData.initialTemperature = temperature;
    });

    volume.addEventListener("change", (event) => {
        const volume = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(volume)) {
            return;
        }
        DataManager.runDynamicsData.initialVolume = volume;
    });

    timeStep.addEventListener("change", (event) => {
        const timeStep = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(timeStep)) {
            return;
        }
        DataManager.runDynamicsData.timeStep = timeStep;
    });

    stepCount.addEventListener("change", (event) => {
        const stepCount = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(stepCount)) {
            return;
        }
        DataManager.runDynamicsData.stepCount = stepCount;
    });

    interval.addEventListener("change", (event) => {
        const interval = parseFloat((event.target as HTMLInputElement).value);
        if(isNaN(interval)) {
            return;
        }
        DataManager.runDynamicsData.interval = interval;
    });

    return content;
};