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
    return content;
};